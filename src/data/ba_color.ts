import { _ } from 'compiled-i18n';

export const getListColor = () => {
  return [
    { label: _('color_preview_first'), value: 'rgb(191, 3, 31)' },
    { label: _('color_preview_second'), value: 'rgb(51, 51, 51)' },
    { label: _('color_preview_third'), value: 'rgb(0 149 174)' },
  ];
};
