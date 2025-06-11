import { component$, useResource$, Resource, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { supabase } from '~/lib/db';
import type { UserProfile } from '~/root';
import { useLocation } from '@builder.io/qwik-city';
import { Image } from '@unpic/qwik';
import { Hello } from '~/assets/hello';

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
    <main class="main">
      <nav class="navbar">
        <ul>
          <li>
            <a href="#hero">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <Resource
        value={data}
        onPending={() => <p>Loading...</p>}
        onRejected={(err) => <p>Error: {err.message}</p>}
        onResolved={(profile) => (
          <>
            <section id="hero" class="section hero">
              <div id="header">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                    width: '100%',
                    // minHeight: '580px',
                    backgroundColor: '#f5f5f7',
                    borderRadius: '28px',
                    maxWidth: '50%',
                    gap: '15px',
                  }}
                >
                  <div class="dd-details">
                    <p class="job_title">{profile.job_title}</p>
                    <p class="user">{`Meet with an expert. ${profile.first_name} ${profile.last_name}`}</p>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      // justifyContent: 'center',
                      paddingInline: '30px',
                      paddingBlock: '0 30px',
                      gap: '30px',
                    }}
                  >
                    <Image
                      objectFit="cover"
                      width={300}
                      // height={300}
                      src={profile.img_url}
                      layout="constrained"
                      decoding="async"
                      loading="eager"
                      alt={`${profile.first_name} ${profile.last_name}`}
                      class="card-avatar"
                    />
                    <div>
                      <Hello />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="about" class="section">
              <div class="content">
                <h2>About</h2>
                <p>{profile.position}</p>
              </div>
            </section>

            <section id="services" class="section alt">
              <div class="content">
                <h2>Services</h2>
                <p>Custom websites, animations, performance optimization and more.</p>
              </div>
            </section>

            <footer id="contact" class="footer-section">
              <div class="container">
                <div class="main-title">
                  <div class="top-left-corner" />
                  <h4>Contact Me</h4>
                  <div class="top-right-corner" />
                </div>

                <div class="content-wrapper">
                  <div class="contact-info">
                    <h4 class="sub-title">Contact Info</h4>
                    <div class="info-grid">
                      <div class="info-item">
                        <span class="name">Address</span>
                        <div class="value">
                          <i class="fas fa-map-marker-alt"></i>
                          <span>Rome, Italy</span>
                        </div>
                      </div>
                      <div class="info-item">
                        <span class="name">Phone</span>
                        <div class="value">
                          <i class="fas fa-mobile-alt"></i>
                          <span>{profile.telephone}</span>
                        </div>
                      </div>
                      <div class="info-item">
                        <span class="name">Email</span>
                        <div class="value">
                          <i class="fas fa-envelope"></i>
                          <span>{profile.email}</span>
                        </div>
                      </div>
                      <div class="info-item">
                        <span class="name">Website</span>
                        <div class="value">
                          <i class="fas fa-globe"></i>
                          <a href="https://www.eduardcapanu.com" target="_blank">
                            www.eduardcapanu.com
                          </a>
                        </div>
                      </div>
                      <div class="info-item">
                        <span class="name">Social Media</span>
                        <div class="value socials">
                          {profile.twitter && (
                            <a href={profile.twitter} target="_blank">
                              <i class="fab fa-twitter" />
                            </a>
                          )}
                          {profile.instagram && (
                            <a href={profile.instagram} target="_blank">
                              <i class="fab fa-instagram" />
                            </a>
                          )}
                          {profile.linkedin && (
                            <a href={profile.linkedin} target="_blank">
                              <i class="fab fa-linkedin-in" />
                            </a>
                          )}
                        </div>
                      </div>
                      <div class="info-item">
                        <span class="name">My Blogs</span>
                        <div class="value">
                          <a href="https://medium.com/@capanueduard98" target="_blank">
                            <i class="fa-brands fa-medium" />
                          </a>
                          <a href="https://dev.to/razxssd" target="_blank">
                            <i class="fa-brands fa-dev" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="contact-form">
                    <h4 class="sub-title">Contact Form</h4>
                    <div class="form-container">
                      <p>Do you need more specific info? Get in touch with me by pressing the link below.</p>
                      <a href="https://form.typeform.com/to/sUIhAE" target="_blank" class="form-link">
                        <i class="fas fa-external-link-alt"></i>
                        <span>Open contact form</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="inner-footer">
                  <div class="bottom-left-corner" />
                  <a class="scroll-up" href="#hero">
                    <span></span>
                    <span></span>
                    <span></span>
                  </a>
                  <div class="bottom-right-corner" />
                </div>
              </div>
            </footer>
          </>
        )}
      />
    </main>
  );
});
