import { _ } from 'compiled-i18n';

export const getListItems = (locale: string) => {
  return [
    // { label: _('navbar_about'), href: `/${locale}/${_('slug_about')}/` },
    { label: _('navbar_search'), href: `/${locale}/${_('slug_search')}/` },
    { label: _('navbar_services'), href: `/${locale}/${_('slug_services')}/` },
    { label: _('navbar_contact'), href: `/${locale}/${_('slug_contact')}/` },
    { label: _('navbar_pricing'), href: `/${locale}/${_('slug_pricing')}/` },
  ];
};
