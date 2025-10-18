/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
// import { renderToStream, type RenderToStreamOptions } from '@builder.io/qwik/server';
// import { manifest } from '@qwik-client-manifest';
// import Root from './root';

// export default function (opts: RenderToStreamOptions) {
//   return renderToStream(<Root />, {
//     manifest,
//     ...opts,
//     // Use container attributes to set attributes on the html tag.
//     containerAttributes: {
//       lang: 'en_US',
//       ...opts.containerAttributes,
//     },
//     serverData: {
//       ...opts.serverData,
//     },
//   });
// }

/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is rendered outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 */

// ✅ Extra imports per compiled-i18n
import { extractBase, setSsrLocaleGetter } from 'compiled-i18n/qwik';
import { renderToStream, type RenderToStreamOptions } from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import Root from './root';

// ✅ Attiva il getter del locale SSR
setSsrLocaleGetter();

export default function (opts: RenderToStreamOptions) {
  return renderToStream(<Root />, {
    manifest,
    ...opts,

    // ✅ Base path per gli asset (es. immagini, font ecc.)
    base: extractBase,

    // ✅ Imposta l'attributo lang correttamente in base al locale attivo
    containerAttributes: {
      lang: opts.serverData!.locale,
      ...opts.containerAttributes,
    },

    // 🔄 Copia i dati server-side (eventualmente estensibile)
    serverData: {
      ...opts.serverData,
    },
  });
}
