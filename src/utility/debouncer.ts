// import { $, useSignal, type QRL, implicit$FirstArg } from '@builder.io/qwik';
// export const useDebouncerQrl = <A extends unknown[], R>(fn: QRL<(...args: A) => R>, delay: number): QRL<(...args: A) => void> => {
//   const timeoutId = useSignal<number>();

//   return $((...args: A): void => {
//     window.clearTimeout(timeoutId.value);
//     timeoutId.value = window.setTimeout((): void => {
//       void fn(...args);
//     }, delay);
//   });
// };

// export const useDebouncer$ = implicit$FirstArg(useDebouncerQrl);

import { $, useSignal, type QRL, implicit$FirstArg } from '@builder.io/qwik';

export const useDebouncerQrl = <A extends unknown[], R>(fn: QRL<(...args: A) => R>, delay: number) => {
  const timeoutId = useSignal<number>();

  const run = $((...args: A): void => {
    window.clearTimeout(timeoutId.value);
    timeoutId.value = window.setTimeout(() => {
      void fn(...args);
    }, delay);
  });

  const cancel = $(() => {
    window.clearTimeout(timeoutId.value);
  });

  // invece di patchare il QRL, ritorno entrambe le funzioni
  return { run, cancel };
};

export const useDebouncer$ = implicit$FirstArg(useDebouncerQrl);
