import { component$, useResource$, Resource, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { supabase } from '~/lib/db';
import type { UserProfile } from '~/root';
import { useLocation } from '@builder.io/qwik-city';
import { Image } from '@unpic/qwik';
import { Email } from '~/assets/email';
import { Mobile } from '~/assets/mobile';
import { Marker } from '~/assets/marker';
import { FacebookFooter } from '~/assets/facebook_footer';
import { LinkedinFooter } from '~/assets/linkedin_footer';

export const Website = component$(() => {
  const location = useLocation();
  const id = location.params.slug.split('/')[1];

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

                  <button class="menu-button">
                    <div class="menu-line line-1"></div>
                    <div class="menu-line line-2"></div>
                    <div class="menu-line line-3"></div>
                  </button>
                </div>
              </div>
            </nav>
          </header>
          <section class="hero">
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
          <div class="general_wrap">
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

            <section class="services">
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
                        <h4 class="service_heading ">
                          <span>Our Services, Tailored to Your Vision</span>
                        </h4>
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
            <footer>
              <div class="footer-container">
                <div class="footer-column">
                  <h3>Contatti</h3>
                  <div class="footer-info">
                    <Marker /> {profile.position}
                  </div>
                  <div class="footer-info">
                    <Mobile /> <a href={`tel:${profile.telephone}`}>{profile.telephone}</a>
                  </div>
                  <div class="footer-info">
                    <Email /> <a href={`mailto:${profile.email}`}>{profile.email}</a>
                  </div>
                  <div class="footer-info">
                    <i class="fas fa-globe"></i>{' '}
                    <a href="https://www.eduardcapanu.com" target="_blank">
                      www.eduardcapanu.com
                    </a>
                  </div>
                </div>

                <div class="footer-column">
                  <h3>Seguimi</h3>
                  <div class="social-icons">
                    <a href={profile.facebook} aria-label="Facebook">
                      <FacebookFooter fill={'#232323'} />
                    </a>
                    <a href="#" aria-label="Instagram">
                      <i class="fab fa-instagram"></i>
                    </a>
                    <a href={profile.linkedin} aria-label="LinkedIn">
                      <LinkedinFooter fill={'#232323'} />
                    </a>
                    <a href="#" aria-label="GitHub">
                      <i class="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </main>
      )}
    />
  );
});
