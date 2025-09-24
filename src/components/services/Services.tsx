import { component$, useContext, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { _, getLocale } from 'compiled-i18n';
import { Link } from '@builder.io/qwik-city';
import { UserSessionContext } from '~/root';

export const Services = component$(() => {
  const currentLocale = getLocale();
  const userSession = useContext(UserSessionContext);

  useStyles$(styles);
  return (
    <>
      <header>
        <h1 class="service_main_title">{_('page_services_main_title')}</h1>
        <p>{_('page_services_subtitle')}</p>
      </header>

      <main class="services_container">
        <div class="highlight">
          <strong>{_('highlight_strong')}</strong>
          <br />
          {_('highlight_after')}
        </div>

        <section class="section">
          <h2 class="service_subtitle">{_('section_free_title')}</h2>
          <p>{_('section_free_description')}</p>
          <ul class="check-list">
            <li>{_('free_avatar')}</li>
            <li>{_('free_name')}</li>
            <li>{_('free_professional_description')}</li>
            <li>{_('free_up_to_3_services')}</li>
            <li>{_('free_up_to_3_success_cases')}</li>
            <li>{_('free_footer_info')}</li>
          </ul>
        </section>

        <section class="section">
          <h2 class="service_subtitle">{_('section_no_subscription_title')}</h2>
          <ul class="check-list">
            <li>
              {_('no_sub_card_before')}
              <strong>{_('no_sub_card_strong')}</strong>
              {_('no_sub_card_after')}
            </li>
            <li>
              {_('no_sub_page_before')}
              <strong>{_('no_sub_page_strong')}</strong>
              {_('no_sub_page_after')}
            </li>
            <li>{_('no_sub_contacts_hidden')}</li>
          </ul>
        </section>

        <section class="section">
          <h2 class="service_subtitle">{_('section_subscription_title')}</h2>
          <ul class="check-list">
            <li>
              {_('sub_page_before')}
              <strong>{_('sub_page_strong')}</strong>
            </li>
            <li>{_('sub_visitors')}</li>
            <li>{_('sub_search')}</li>
            <li>{_('sub_visibility')}</li>
          </ul>
        </section>

        <section class="section">
          <h2 class="service_subtitle">{_('section_how_title')}</h2>
          <ol>
            <li>{_('how_step1')}</li>
            <li>{_('how_step2')}</li>
            <li>{_('how_step3')}</li>
          </ol>
        </section>

        <div class="cta">
          {!userSession.isLoggedIn && <Link href={`/${currentLocale}/${_('slug_signup')}/`}>{_('cta_signup')}</Link>}

          {!userSession.hasAccess && <Link href={`/${currentLocale}/${_('slug_pricing')}/`}>{_('cta_pricing')}</Link>}
        </div>
      </main>
    </>
  );
});
