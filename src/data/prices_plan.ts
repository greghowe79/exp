import type { RouteLocation } from '@builder.io/qwik-city';
import { _, setDefaultLocale } from 'compiled-i18n';

export const usePlans = (location: RouteLocation) => {
  // setLocaleGetter(() => location.params.locale);
  if (process.env.NODE_ENV === 'development') {
    setDefaultLocale(location.params.locale || 'en_US');
  }

  const paymentLinks: Record<string, { monthly: string; yearly: string }> = {
    it_IT: {
      monthly: 'https://buy.stripe.com/test_6oU7sN77e1Aje7x4R28Ra05',
      yearly: 'https://buy.stripe.com/test_6oU4gB77e7YH6F5bfq8Ra06',
    },
    en_US: {
      monthly: 'https://buy.stripe.com/test_8x2bJ30IQgvd0gHfvG8Ra08',
      yearly: 'https://buy.stripe.com/test_9B6aEZ1MU3IrgfF3MY8Ra07',
    },
    // 'es_ES': {
    //   monthly: 'https://buy.stripe.com/test_xyz123456esMONTH',
    //   yearly: 'https://buy.stripe.com/test_xyz123456esYEAR',
    // },
  };
  const links = paymentLinks[location.params.locale] ?? paymentLinks['it_IT'];
  return [
    {
      link: process.env.NODE_ENV === 'development' ? links.monthly : '',
      priceId: process.env.NODE_ENV === 'development' ? 'price_1RdYJHRoxQZE75KBqOE3CAYb' : '',
      price: 4.9,
      duration: _('page_pricing_duration_month'),
    },
    {
      link: process.env.NODE_ENV === 'development' ? links.yearly : '',
      priceId: process.env.NODE_ENV === 'development' ? 'price_1RdYLsRoxQZE75KBpgW6iWga' : '',

      price: 39.0,
      duration: _('page_pricing_duration_year'),
    },
  ];
};
