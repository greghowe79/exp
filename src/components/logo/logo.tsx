import { component$ } from '@builder.io/qwik';

type LogoProps = {
  fillCircle?: string;
  fillPath?: string;
};

export const Logo = component$<LogoProps>(({ fillCircle, fillPath }) => {
  return (
    <svg width="48" height="48" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none">
      <circle cx="100" cy="100" r="100" fill={fillCircle ? fillCircle : '#333'} />
      <path d="M70 130 L130 100 L70 70 L90 100 Z" fill={fillPath ? fillPath : '#fff'} />
    </svg>
  );
});
