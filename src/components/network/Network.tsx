import { component$, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { Button } from '@greghowe79/the-lib';
import { useNavigate } from '@builder.io/qwik-city';
import { _, getLocale } from 'compiled-i18n';

const Network = component$(() => {
  const navigate = useNavigate();
  const currentLocale = getLocale();
  useStyles$(styles);
  return (
    <div class="container padding-top-large padding-bottom-large">
      <div class="row">
        <div class="column content-center">
          <h2 class="heading-large margin-bottom-large">{_('network_section_heading')}</h2>
          <p class="text-medium margin-bottom-large">{_('network_section_description')}</p>
          <div>
            <Button
              id="go_search_page"
              label={_('network_section_button')}
              size="lg"
              onClick$={async () => await navigate(`/${currentLocale}/${_('slug_search')}/`)}
            />
          </div>
        </div>

        <div class="column">
          <img class="img-responsive" src="http://localhost:5173/network.png" width="630" height="400" alt="Professional Network" />
        </div>
      </div>
    </div>
  );
});
export default Network;
