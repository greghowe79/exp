import { _ } from 'compiled-i18n';
import manOneUrl from '../assets/images/man_one.png';
import manTwoUrl from '../assets/images/man_two.png';
import manThreeUrl from '../assets/images/man_three.png';
import womanOneUrl from '../assets/images/woman_one.png';
import womanTwoUrl from '../assets/images/woman_two.png';
import womanThreeUrl from '../assets/images/woman_three.png';

export const getListAvatars = () => {
  return [
    { label: _('name_avatar_one'), value: 'creative', url: manOneUrl },
    { label: _('name_avatar_two'), value: 'understated', url: manTwoUrl },
    { label: _('name_avatar_three'), value: 'meticulous', url: manThreeUrl },
    { label: _('name_avatar_four'), value: 'thoughtful', url: womanOneUrl },
    { label: _('name_avatar_five'), value: 'bubbly', url: womanTwoUrl },
    { label: _('name_avatar_six'), value: 'brilliant', url: womanThreeUrl },
  ];
};
