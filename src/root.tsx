import { $, component$, createContextId, type QRL, useContextProvider, useStore, useTask$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';
import { RouterHead } from './components/router-head/router-head';
import { isDev } from '@builder.io/qwik';

import './global.css';

export interface PopupData {
  title: string;
  description: string;
  isSuccess: boolean;
  redirectAfterClose?: string;
}

export interface PopupProps {
  id: string;
  data: PopupData;
}

export interface PopupContextState {
  popup: PopupProps | null;
  open: QRL<(id: string, data: PopupData) => void>;
  close: QRL<(redirectUrl?: string) => Promise<string | undefined>>;
}

export const PopupContext = createContextId<PopupContextState>('popup-context');

export default component$(() => {
  /**
   * The root of a QwikCity site always start with the <QwikCityProvider> component,
   * immediately followed by the document's <head> and <body>.
   *
   * Don't remove the `<head>` and `<body>` elements.
   */

  const state = useStore<PopupContextState>({
    popup: null,
    open: undefined as any,
    close: undefined as any,
  });

  useTask$(() => {
    state.open = $((id: string, data: PopupData) => {
      state.popup = { id, data };
    });

    state.close = $(() => {
      const redirectUrl = state.popup?.data.redirectAfterClose;
      state.popup = null;
      return Promise.resolve(redirectUrl);
    });
  });

  useContextProvider(PopupContext, state);

  return (
    <QwikCityProvider>
      <head>
        <meta charset="utf-8" />
        {!isDev && <link rel="manifest" href={`${import.meta.env.BASE_URL}manifest.json`} />}
        <RouterHead />
      </head>
      <body lang="en">
        <RouterOutlet />
        {!isDev && <ServiceWorkerRegister />}
      </body>
    </QwikCityProvider>
  );
});
