import { component$, useContext, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { getLocale } from 'compiled-i18n';
import { Link } from '@builder.io/qwik-city';
import { UserSessionContext } from '~/root';

interface TranslationsProps {
  t: Record<string, string>;
}

export const Services = component$<TranslationsProps>(({ t }) => {
  const currentLocale = getLocale();
  const userSession = useContext(UserSessionContext);

  useStyles$(styles);
  return (
    <>
      <header>
        {/* <h1 class="service_main_title">{_('page_services_main_title')}</h1> */}
        <h1 class="service_main_title">{t.page_services_main_title}</h1>
        {/* <p>{_('page_services_subtitle')}</p> */}
        <p>{t.page_services_subtitle}</p>
      </header>

      <main class="services_container">
        <div class="highlight">
          {/* <strong>{_('highlight_strong')}</strong> */}
          <strong>{t.highlight_strong}</strong>
          <br />
          {/* {_('highlight_after')} */}
          {t.highlight_after}
        </div>

        <section class="section">
          {/* <h2 class="service_subtitle">{_('section_free_title')}</h2> */}
          <h2 class="service_subtitle">{t.section_free_title}</h2>
          {/* <p>{_('section_free_description')}</p> */}
          <p>{t.section_free_description}</p>
          <ul class="check-list">
            {/* <li>{_('free_avatar')}</li>
            <li>{_('free_name')}</li>
            <li>{_('free_professional_description')}</li>
            <li>{_('free_up_to_3_services')}</li>
            <li>{_('free_up_to_3_success_cases')}</li>
            <li>{_('free_footer_info')}</li> */}
            <li>{t.free_avatar}</li>
            <li>{t.free_name}</li>
            <li>{t.free_professional_description}</li>
            <li>{t.free_up_to_3_services}</li>
            <li>{t.free_up_to_3_success_cases}</li>
            <li>{t.free_footer_info}</li>
          </ul>
        </section>

        {/* <section class="section">
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
        </section> */}

        <section class="section">
          <h2 class="service_subtitle">{t.section_no_subscription_title}</h2>
          <ul class="check-list">
            <li>
              {t.no_sub_card_before}
              <strong>{t.no_sub_card_strong}</strong>
              {t.no_sub_card_after}
            </li>
            <li>
              {t.no_sub_page_before}
              <strong>{t.no_sub_page_strong}</strong>
              {t.no_sub_page_after}
            </li>
            <li>{t.no_sub_contacts_hidden}</li>
          </ul>
        </section>

        {/* <section class="section">
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
        </section> */}

        <section class="section">
          <h2 class="service_subtitle">{t.section_subscription_title}</h2>
          <ul class="check-list">
            <li>
              {t.sub_page_before}
              <strong>{t.sub_page_strong}</strong>
            </li>
            <li>{t.sub_visitors}</li>
            <li>{t.sub_search}</li>
            <li>{t.sub_visibility}</li>
          </ul>
        </section>

        {/* <section class="section">
          <h2 class="service_subtitle">{_('section_how_title')}</h2>
          <ol>
            <li>{_('how_step1')}</li>
            <li>{_('how_step2')}</li>
            <li>{_('how_step3')}</li>
          </ol>
        </section> */}

        <section class="section">
          <h2 class="service_subtitle">{t.section_how_title}</h2>
          <ol>
            <li>{t.how_step1}</li>
            <li>{t.how_step2}</li>
            <li>{t.how_step3}</li>
          </ol>
        </section>

        {/* <div class="cta">
          {!userSession.isLoggedIn && <Link href={`/${currentLocale}/${_('slug_signup')}/`}>{_('cta_signup')}</Link>}

          {!userSession.hasAccess && <Link href={`/${currentLocale}/${_('slug_pricing')}/`}>{_('cta_pricing')}</Link>}
        </div> */}

        <div class="cta">
          {!userSession.isLoggedIn && <Link href={`/${currentLocale}/${t.slug_signup}/`}>{t.cta_signup}</Link>}

          {!userSession.hasAccess && <Link href={`/${currentLocale}/${t.slug_pricing}/`}>{t.cta_pricing}</Link>}
        </div>
      </main>
    </>
  );
});
