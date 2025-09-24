import { component$, useContext, useSignal, useStyles$, useTask$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { _ } from 'compiled-i18n';
import { usePlans } from '~/data/prices_plan';
import { useLocation } from '@builder.io/qwik-city';
import { PopupContext, UserSessionContext } from '~/root';
import { supabase } from '~/lib/db';

export const Pricing = component$(() => {
  const userSession = useContext(UserSessionContext);

  const location = useLocation();
  useStyles$(styles);

  const plans = usePlans(location);
  const popupContext = useContext(PopupContext);

  const signalPlan = useSignal(plans[0]);

  useTask$(({ track, cleanup }) => {
    const uid = track(() => userSession.userId);

    if (!uid) return;

    const controller = new AbortController();
    cleanup(() => controller.abort());

    (async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('has_access')
        .eq('id', uid)
        .abortSignal(controller.signal)
        .maybeSingle();

      if (error) {
        console.error('Errore fetch has_access:', error);
        return;
      }
      userSession.hasAccess = data?.has_access ?? false;
    })();
  });

  return (
    <section id="pricing">
      <div class="pricing-container">
        <div class="pricing-header">
          <p class="pricing-title">{_('navbar_pricing')}</p>
          <h2 class="pricing-heading">{`${_('page_pricing_greeting')} Site Snap`}</h2>
        </div>

        <div class="pricing-plans">
          <div class="plan-wrapper">
            <div class="plan-card">
              <div class="plan-options">
                <div class="option" onClick$={() => (signalPlan.value = plans[0])}>
                  <input type="radio" name="monthly" class="radio" checked={signalPlan.value.price === 4.9} />
                  <span>{_('page_pricing_type_monthly')}</span>
                </div>
                <div class="option" onClick$={() => (signalPlan.value = plans[1])}>
                  <input type="radio" name="yearly" class="radio" checked={signalPlan.value.price === 39.0} />
                  <span>
                    {_('page_pricing_type_yearly')}
                    <br />
                    (34% {_('page_pricing_off')} 💰)
                  </span>
                </div>
              </div>

              <div class="plan-price">
                <p class="price-value">{`€ ${signalPlan.value.price}`}</p>
                <div class="price-duration">
                  <p class="duration-text">{`${signalPlan.value.duration}`}</p>
                </div>
              </div>

              <ul class="features-list">
                <li class="feature-item">
                  <svg viewBox="0 0 20 20" fill="currentColor" class="check-icon">
                    <path
                      fill-rule="evenodd"
                      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>Qwik boilerplate</span>
                </li>
              </ul>

              <div class="subscribe-button-wrapper">
                <a
                  class="subscribe-button"
                  href={
                    userSession.isLoggedIn && !userSession.hasAccess
                      ? signalPlan.value.link + '?prefilled_email=' + userSession.email
                      : undefined
                  }
                  onClick$={(e) => {
                    if (!userSession.isLoggedIn) {
                      e.preventDefault();
                      popupContext.open('RESULT_POPUP', {
                        title: _('popup.pricing_no_login_title'),
                        description: _('popup.pricing_no_login_description'),
                        primaryButtonLabel: _('button_close'),
                        isSuccess: false,
                        redirectAfterClose: `/${location.params.locale}/${_('slug_login')}/`,
                      });
                      return;
                    }
                    if (userSession.hasAccess) {
                      e.preventDefault();
                      popupContext.open('RESULT_POPUP', {
                        title: _('popup.already_subscribed_title'),
                        description: _('popup.already_subscribed_description'),
                        primaryButtonLabel: _('button_close'),
                        isSuccess: false,
                      });
                      return;
                    }
                  }}
                >
                  {_('page_pricing_btn')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
