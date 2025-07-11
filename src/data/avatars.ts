// export const avatars = [
//   { label: 'Creative', value: 'creative', url: 'http://localhost:5173/man_one.png' },
//   { label: 'Understated', value: 'understated', url: 'http://localhost:5173/man_two.png' },
//   { label: 'Meticulous', value: 'meticulous', url: 'http://localhost:5173/man_three.png' },
//   { label: 'Thoughtful', value: 'thoughtful', url: 'http://localhost:5173/woman_one.png' },
//   { label: 'Bubbly', value: 'bubbly', url: 'http://localhost:5173/woman_two.png' },
//   { label: 'Brilliant', value: 'brilliant', url: 'http://localhost:5173/woman_three.png' },
// ];

import { _ } from 'compiled-i18n';

export const getListAvatars = () => {
  return [
    { label: _('name_avatar_one'), value: 'creative', url: 'http://localhost:5173/man_one.png' },
    { label: _('name_avatar_two'), value: 'understated', url: 'http://localhost:5173/man_two.png' },
    { label: _('name_avatar_three'), value: 'meticulous', url: 'http://localhost:5173/man_three.png' },
    { label: _('name_avatar_four'), value: 'thoughtful', url: 'http://localhost:5173/woman_one.png' },
    { label: _('name_avatar_five'), value: 'bubbly', url: 'http://localhost:5173/woman_two.png' },
    { label: _('name_avatar_six'), value: 'brilliant', url: 'http://localhost:5173/woman_three.png' },
  ];
};
