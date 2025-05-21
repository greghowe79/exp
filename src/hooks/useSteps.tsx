import { component$ } from '@builder.io/qwik';
import { _ } from 'compiled-i18n';
import { Register } from '~/assets/register';
import { Rocket } from '~/assets/rocket';
import { Search } from '~/assets/search';

const IconWrapper = component$<{ icon: any }>(({ icon: Icon }) => {
  return <Icon />;
});

export const useSteps = () => {
  return [
    {
      id: 'step-1',
      icon: <IconWrapper icon={Search} />,
      title: _('step_search'),
      description: _('step_search_description'),
    },
    {
      id: 'step-2',
      icon: <IconWrapper icon={Register} />,
      title: _('step_register'),
      description:
        'Sei un professionista? Registrati gratuitamente e inizia a costruire la tua presenza online. Mostra le tue competenze e servizi a potenziali clienti.',
    },
    {
      id: 'step-3',
      icon: <IconWrapper icon={Rocket} />,
      title: 'Ottieni la Tua Pagina Web Personale',
      description:
        'Con un account premium, ottieni una pagina web personalizzata per promuovere la tua attività. Aumenta la tua visibilità e attira nuovi clienti con una presenza online dedicata.',
    },
  ];
};
