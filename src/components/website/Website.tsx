import { component$, useResource$, Resource, useStyles$, useSignal } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { supabase } from '~/lib/db';
import type { UserProfile } from '~/root';
import { useLocation } from '@builder.io/qwik-city';
import { Image } from '@unpic/qwik';
import { FacebookFooter } from '~/assets/facebook_footer';
import { LinkedinFooter } from '~/assets/linkedin_footer';
import { InstagramFooter } from '~/assets/instagram_footer';
import { TwitterFooter } from '~/assets/twitter_footer';
import { GlobeFooter } from '~/assets/globe_footer';
import { EnvelopeFooter } from '~/assets/envelope_footer';
import { MobileFooter } from '~/assets/mobile_footer';
import { LocationFooter } from '~/assets/location_footer';
import { _ } from 'compiled-i18n';
import { YouTubeFooter } from '~/assets/youtube_footer';
import { GitHubFooter } from '~/assets/github_footer';

export const Website = component$(() => {
  const location = useLocation();
  const id = location.params.slug.split('/')[1];
  const menuOpen = useSignal(false);

  const data = useResource$<UserProfile>(async () => {
    const { data, error } = await supabase.from('professionals').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data;
  });

  useStyles$(styles);

  return (
    <Resource
      value={data}
      onPending={() => <p>Loading...</p>}
      onRejected={(err) => <p>Error: {err.message}</p>}
      onResolved={(profile) => (
        <main class="main">
          <header>
            <nav>
              <div class="inner_nav">
                <div class="inner_nav_element_container">
                  <span class="email">
                    <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </span>

                  <button
                    class={`menu-button ${menuOpen.value ? 'open' : ''}`}
                    onClick$={() => (menuOpen.value = !menuOpen.value)}
                    aria-label="Toggle navigation menu"
                  >
                    <div class="menu-line line-1"></div>
                    <div class="menu-line line-2"></div>
                    <div class="menu-line line-3"></div>
                  </button>
                </div>
              </div>

              <div class={`fullscreen-menu ${menuOpen.value ? 'open' : ''}`}>
                <ul>
                  <li>
                    <a
                      href="#"
                      preventdefault:click
                      onClick$={() => {
                        const el = document.getElementById('about');
                        el?.scrollIntoView({ behavior: 'smooth' });
                        menuOpen.value = false;
                      }}
                    >
                      {_('user_navigation_link_section_about')}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      preventdefault:click
                      onClick$={() => {
                        const el = document.getElementById('services');
                        el?.scrollIntoView({ behavior: 'smooth' });
                        menuOpen.value = false;
                      }}
                    >
                      {_('user_navigation_link_section_services')}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      preventdefault:click
                      onClick$={() => {
                        const el = document.getElementById('contact');
                        el?.scrollIntoView({ behavior: 'smooth' });
                        menuOpen.value = false;
                      }}
                    >
                      {_('user_navigation_link_section_contact')}
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </header>
          <section class="hero_section">
            <div class="inner_hero">
              <div class="inner_hero_user_name">
                <h1 class="first_name">{profile.first_name}</h1>
                <h1 class="last_name">{profile.last_name}</h1>
              </div>

              <Image
                objectFit="cover"
                src={'https://crafto.themezaa.com/freelancer/wp-content/uploads/sites/37/2024/04/demo-freelancer-02.png.webp'}
                layout="constrained"
                decoding="async"
                loading="eager"
                alt={`${profile.first_name} ${profile.last_name}`}
                class="card-avatar"
              />
            </div>
          </section>
          <div class="overlapping-text">
            <p class="bridge-text">{profile.job_title || 'Your position text here'}</p>
          </div>
          <div class="general_wrap" id="about">
            <section class="about">
              <div class="divider"></div>
              <div class="section_area">
                <div class="section_content_wrapper">
                  <div class="content-section">
                    <div class="header_section">
                      <div class="title">{`ABOUT ${profile.first_name.toLocaleUpperCase()} ${profile.last_name.toLocaleUpperCase()} `}</div>
                      <div class="step">01</div>
                    </div>
                    <div class="body_section">
                      <p class="description">{profile.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section class="services" id="services">
              <div class="services_divider"></div>
              <div class="parent">
                <div class="first_child">
                  {' '}
                  <Image
                    src={'https://crafto.themezaa.com/freelancer/wp-content/uploads/sites/37/2024/04/demo-freelancer-06.png.webp'}
                    layout="constrained"
                    decoding="async"
                    loading="eager"
                    alt={`${profile.first_name} ${profile.last_name}`}
                    class="service_image"
                  />
                </div>
                <div class="second_child">
                  <div>
                    <div>
                      <div class="widget-container">
                        <h2 class="service_heading ">
                          <span>Our Services, Tailored to Your Vision</span>
                        </h2>
                      </div>
                    </div>
                    <div class="services_main-content">
                      <div class="widget-container">
                        Currently improving users experience and interface design as lead designer director at crafto agency. Creating brand
                        identities and experiences.
                      </div>
                    </div>
                    <div>
                      <div class="widget-container">
                        <div class="progress-wrapper" role="progressbar">
                          <div class="progress-bar" data-max="80" style="width: 80%;">
                            <span class="progress-text">WEB DESIGN </span>
                            <span class="progress-percentage">80% </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="widget-container">
                        <div class="progress-wrapper" role="progressbar">
                          <div class="progress-bar" data-max="98" style="width: 98%;">
                            <span class="progress-text">GRAPHIC DESIGN</span>
                            <span class="progress-percentage">98% </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="widget-container">
                        <div class="progress-wrapper" role="progressbar">
                          <div class="progress-bar" data-max="85" style="width: 85%;">
                            <span class="progress-text">ART DIRECTION </span>
                            <span class="progress-percentage">85% </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <footer id="contact">
              <div class="footer-container">
                <div class="footer-column">
                  <h2>{_('page_contact')}</h2>
                  <div class="footer-info">
                    <LocationFooter fill={'#232323'} />{' '}
                    <a
                      class="website_url"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.position)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {profile.position}
                    </a>
                  </div>
                  <div class="footer-info">
                    <MobileFooter fill={'#232323'} /> <a href={`tel:${profile.telephone}`}>{profile.telephone}</a>
                  </div>
                  <div class="footer-info">
                    <EnvelopeFooter fill={'#232323'} />
                    <a class="footer_email" href={`mailto:${profile.email}`} target="_blank" rel="noopener noreferrer">
                      {profile.email}
                    </a>
                  </div>
                  {profile.website && (
                    <div class="footer-info">
                      <GlobeFooter fill={'#232323'} />
                      <a href={profile.website} target="_blank" class="website_url" rel="noopener noreferrer">
                        {profile.website}
                      </a>
                    </div>
                  )}
                </div>

                <div class="footer-column">
                  <h3>{_('social_media')}</h3>
                  <div class="social-icons">
                    {profile.facebook && (
                      <a href={profile.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                        <FacebookFooter fill={'#232323'} />
                      </a>
                    )}
                    {profile.instagram && (
                      <a href={profile.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                        <InstagramFooter fill={'#232323'} />
                      </a>
                    )}
                    {profile.linkedin && (
                      <a href={profile.linkedin} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                        <LinkedinFooter fill={'#232323'} />
                      </a>
                    )}
                    {profile.twitter && (
                      <a href={profile.twitter} aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                        <TwitterFooter fill={'#232323'} />
                      </a>
                    )}
                    {profile.github && (
                      <a href={profile.github} aria-label="Github" target="_blank" rel="noopener noreferrer">
                        <GitHubFooter fill={'#232323'} />
                      </a>
                    )}
                    {profile.youtube && (
                      <a href={profile.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                        <YouTubeFooter fill={'#232323'} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div class="footer-container">
                <div class="footer-bottom">
                  <div class="footer-legal-links">
                    <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
                      {_('privacy_policy')}
                    </a>
                    <span>|</span>
                    <a href="/cookie-policy" target="_blank" rel="noopener noreferrer">
                      {_('cookie_policy')}
                    </a>
                    <span>|</span>
                    <a href="/termini-condizioni" target="_blank" rel="noopener noreferrer">
                      {_('terms_of_use')}
                    </a>
                  </div>
                  <p class="copyright">
                    &copy; {new Date().getFullYear()} {profile.first_name} {profile.last_name}. {_('all_rights_reserved')}
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </main>
      )}
    />
  );
});
