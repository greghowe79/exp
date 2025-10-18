import { component$, useStyles$ } from '@builder.io/qwik';
import { _ } from 'compiled-i18n';
import styles from './styles.css?inline';
import { EnvelopeFooter } from '~/assets/envelope_footer';
import { FacebookFooter } from '~/assets/facebook_footer';
import { GitHubFooter } from '~/assets/github_footer';
import { GlobeFooter } from '~/assets/globe_footer';
import { InstagramFooter } from '~/assets/instagram_footer';
import { LinkedinFooter } from '~/assets/linkedin_footer';
import { LocationFooter } from '~/assets/location_footer';
import { MobileFooter } from '~/assets/mobile_footer';
import { TwitterFooter } from '~/assets/twitter_footer';
import { YouTubeFooter } from '~/assets/youtube_footer';

interface TranslationsProps {
  t: Record<string, string>;
}

export const Footer = component$<TranslationsProps>(({ t }) => {
  useStyles$(styles);
  return (
    <footer id="site_contact">
      <div class="footer-container">
        <div class="footer-column">
          {/* <h2>{_('page_contact')}</h2> */}
          <h2>{t.page_contact}</h2>

          <div class="site_footer_info">
            <LocationFooter fill={'#f5f5f7'} />{' '}
            <a
              class="website_url"
              href="https://www.google.com/maps/search/?api=1&query=10034%2C+Chivasso%2C+Torino%2C+Piemonte%2C+Italia
"
              target="_blank"
              rel="noopener noreferrer"
            >
              10034, Chivasso, Torino, Piemonte, Italia
            </a>
          </div>

          <div class="site_footer_info">
            <MobileFooter fill={'#f5f5f7'} /> <a href="tel:+393714200848">+39 371 4200848</a>
          </div>

          <div class="site_footer_info">
            <EnvelopeFooter fill={'#f5f5f7'} />
            <a class="footer_email" href="mailto:alessandromosca3011@gmail.com" target="_blank" rel="noopener noreferrer">
              alessandromosca3011@gmail.com
            </a>
          </div>

          <div class="site_footer_info">
            <GlobeFooter fill={'#f5f5f7'} />
            <a href="https://www.brifiworks.com/" target="_blank" class="website_url" rel="noopener noreferrer">
              https://www.brifiworks.com/
            </a>
          </div>
        </div>

        <div class="footer-column">
          {/* <h3>{_('social_media')}</h3> */}
          <h3>{t.social_media}</h3>
          <div class="social-icons">
            <a
              href="https://www.linkedin.com/in/alessandro-mosca-b4631b86/"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FacebookFooter fill={'#f5f5f7'} />
            </a>

            <a
              href="https://www.linkedin.com/in/alessandro-mosca-b4631b86/"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramFooter fill={'#f5f5f7'} />
            </a>

            <a
              href="https://www.linkedin.com/in/alessandro-mosca-b4631b86/"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinFooter fill={'#f5f5f7'} />
            </a>

            <a href="https://www.linkedin.com/in/alessandro-mosca-b4631b86/" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <TwitterFooter fill={'#f5f5f7'} />
            </a>

            <a href="https://www.linkedin.com/in/alessandro-mosca-b4631b86/" aria-label="Github" target="_blank" rel="noopener noreferrer">
              <GitHubFooter fill={'#f5f5f7'} />
            </a>

            <a href="https://www.linkedin.com/in/alessandro-mosca-b4631b86/" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <YouTubeFooter fill={'#f5f5f7'} />
            </a>
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
            &copy; {new Date().getFullYear()} Site Snap. {_('all_rights_reserved')}
          </p>
        </div>
      </div>
    </footer>
  );
});
