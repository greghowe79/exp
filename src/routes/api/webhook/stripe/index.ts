import { type RequestHandler } from '@builder.io/qwik-city';

import { Stripe } from 'stripe';
import { supabase } from '~/lib/db';
export const onPost: RequestHandler = async (reqEvent) => {
  const stripe_key = reqEvent.env.get('STRIPE_SECRET_KEY');
  const webhook_secret = reqEvent.env.get('STRIPE_WEBHOOK-SECRET');
  const stripe = new Stripe(stripe_key!);
  const body = reqEvent.request.body;
  const buffers = [];

  // node.js readable streams implement the async iterator protocol
  //@ts-ignore
  for await (const data of body) {
    buffers.push(data);
  }
  const finalBuffer = Buffer.concat(buffers);
  const sig = reqEvent.request.headers.get('stripe-signature');

  if (webhook_secret && sig) {
    let eventType = 'unknown';

    try {
      const event = stripe.webhooks.constructEvent(finalBuffer.toString(), sig, webhook_secret);
      eventType = event.type;

      if (event.type === 'checkout.session.completed') {
        const session = await stripe.checkout.sessions.retrieve(event.data.object.id, {
          expand: ['line_items'],
        });

        const customerId = session.customer;
        if (typeof customerId !== 'string' || !customerId) {
          throw new Error('Invalid customer ID');
        }

        const customer = (await stripe.customers.retrieve(customerId)) as Stripe.Customer;
        const priceId = session.line_items?.data[0]?.price?.id ?? null;

        if (customer.email) {
          const customerId = session.customer;
          const { error } = await supabase
            .from('profiles')
            .update({ has_access: true, price_id: priceId, customer_id: customerId })
            .eq('email', customer.email);

          if (error) {
            console.error('Errore aggiornando profilo:', error);
          }
        }
      }

      if (event.type === 'customer.subscription.deleted') {
        const subscription = await stripe.subscriptions.retrieve(event.data.object.id);

        if (subscription.customer) {
          const { error } = await supabase.from('profiles').update({ has_access: false }).eq('customer_id', subscription.customer);
          if (error) {
            console.error('Errore aggiornando profilo (revoca accesso):', error);
          }
        }
      }
    } catch (err: any) {
      console.error('stripe error: ' + err.message + ' | EVENT TYPE: ' + eventType);
    }
  }

  reqEvent.send(200, 'success');
};
