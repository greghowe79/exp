// import { _, getLocale } from 'compiled-i18n';
import { getLocale } from 'compiled-i18n';
import { component$, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { Modal, Input } from '@greghowe79/the-lib';
import { validateEmail, validatePassword } from '~/utility/validators';
import { useAuth } from '~/hooks/useSignUp';
import { Link, useNavigate } from '@builder.io/qwik-city';

interface TranslationsProps {
  t: Record<string, string>;
}

export const Login = component$<TranslationsProps>(({ t }) => {
  useStyles$(styles);
  const nav = useNavigate();
  const currentLocale = getLocale();
  const { open, email, password, emailError, passwordError, emailTouched, passwordTouched, isLoading, isSubmitDisabled, handleAuth } =
    useAuth('LOGIN', nav);

  return (
    <main class="form-container">
      {/* <h1 class="visually-hidden">{_('navbar_login')}</h1> */}
      <h1 class="visually-hidden">{t.navbar_login}</h1>
      <Link href={`/${currentLocale}`} class="back_button">
        {/* ← {_('form_back_home')} */}← {t.form_back_home}
      </Link>
      <Modal
        open={open}
        // title={_('navbar_login')}
        title={t.navbar_login}
        closeButtonVisible={false}
        primaryAction={handleAuth}
        isLoading={isLoading}
        // primaryButtonLabel={_('navbar_login')}
        primaryButtonLabel={t.navbar_login}
        primaryButtonDisabled={isSubmitDisabled}
        type="small"
        light
      >
        <form
          class="form"
          preventdefault:submit
          onSubmit$={async (event) => {
            event.preventDefault();
            emailError.value = await validateEmail(email.value);
            passwordError.value = await validatePassword(password.value);
            emailTouched.value = true;
            passwordTouched.value = true;

            if (!emailError.value && !passwordError.value) {
              await handleAuth();
            }
          }}
        >
          <Input
            id="input_email"
            type="email"
            placeholder="Email"
            autocomplete="email"
            value={email}
            error={emailError}
            onValidate$={async (value) => {
              emailError.value = await validateEmail(value);
              return emailError.value!;
            }}
            onInput$={() => (emailTouched.value = true)}
            // label={_('email')}
            label={t.email}
          />

          <Input
            id="input_password"
            type="password"
            placeholder="Enter your password"
            autocomplete="current-password"
            //label={_('password')}
            label={t.password}
            value={password}
            error={passwordError}
            onValidate$={async (value) => {
              passwordError.value = await validatePassword(value);
              return passwordError.value!;
            }}
            onInput$={() => (passwordTouched.value = true)}
          />
          <div class="login_form_links_container">
            {/* <Link href={`/${currentLocale}/${_('slug_signup')}`} aria-label="signup" class="reset_password"> */}
            <Link href={`/${currentLocale}/${t.slug_signup}`} aria-label="signup" class="reset_password">
              {/* {_('form_signup')} */}
              {t.form_signup}
            </Link>
            {/* <Link href={`/${currentLocale}/${_('slug_reset_password')}`} aria-label="reset-password" class="reset_password"> */}
            <Link href={`/${currentLocale}/${t.slug_reset_password}`} aria-label="reset-password" class="reset_password">
              {/* {_('form_reset_password')} */}
              {t.form_reset_password}
            </Link>
          </div>
          <button class="hidden-button" type="submit" aria-label="submit">
            submit
          </button>
        </form>
      </Modal>
    </main>
  );
});
