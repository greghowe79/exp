import { _ } from 'compiled-i18n';

export const getListItems = (locale: string) => {
  return [
    { label: _('navbar_about'), href: `/${locale}/about/` },
    { label: _('navbar_services'), href: `/${locale}/services/` },
    { label: _('navbar_contact'), href: `/${locale}/contact/` },
  ];
};
