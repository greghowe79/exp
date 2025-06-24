import type { RouteLocation } from '@builder.io/qwik-city';
import { _, setLocaleGetter } from 'compiled-i18n';

export const usePlans = (location: RouteLocation) => {
  setLocaleGetter(() => location.params.locale);

  return [
    {
      link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_6oU7sN77e1Aje7x4R28Ra05' : '',
      priceId: process.env.NODE_ENV === 'development' ? 'price_1RdYJHRoxQZE75KBqOE3CAYb' : '',
      price: 4.9,
      duration: _('page_pricing_duration_month'),
    },
    {
      link: process.env.NODE_ENV === 'development' ? 'https://buy.stripe.com/test_6oU4gB77e7YH6F5bfq8Ra06' : '',
      priceId: process.env.NODE_ENV === 'development' ? 'price_1RdYLsRoxQZE75KBpgW6iWga' : '',

      price: 39.0,
      duration: _('page_pricing_duration_year'),
    },
  ];
};
