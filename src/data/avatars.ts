// import { _ } from 'compiled-i18n';

// export const getListAvatars = () => {
//   return [
//     { label: _('name_avatar_one'), value: 'creative', url: 'http://localhost:5173/man_one.png' },
//     { label: _('name_avatar_two'), value: 'understated', url: 'http://localhost:5173/man_two.png' },
//     { label: _('name_avatar_three'), value: 'meticulous', url: 'http://localhost:5173/man_three.png' },
//     { label: _('name_avatar_four'), value: 'thoughtful', url: 'http://localhost:5173/woman_one.png' },
//     { label: _('name_avatar_five'), value: 'bubbly', url: 'http://localhost:5173/woman_two.png' },
//     { label: _('name_avatar_six'), value: 'brilliant', url: 'http://localhost:5173/woman_three.png' },
//   ];
// };

import { _ } from 'compiled-i18n';

const PUBLIC_BASE_URL = import.meta.env.PUBLIC_BASE_URL || 'http://localhost:5173';

export const getListAvatars = () => {
  return [
    { label: _('name_avatar_one'), value: 'creative', url: `${PUBLIC_BASE_URL}/man_one.png` },
    { label: _('name_avatar_two'), value: 'understated', url: `${PUBLIC_BASE_URL}/man_two.png` },
    { label: _('name_avatar_three'), value: 'meticulous', url: `${PUBLIC_BASE_URL}/man_three.png` },
    { label: _('name_avatar_four'), value: 'thoughtful', url: `${PUBLIC_BASE_URL}/woman_one.png` },
    { label: _('name_avatar_five'), value: 'bubbly', url: `${PUBLIC_BASE_URL}/woman_two.png` },
    { label: _('name_avatar_six'), value: 'brilliant', url: `${PUBLIC_BASE_URL}/woman_three.png` },
  ];
};
