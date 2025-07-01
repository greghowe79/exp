import { _, getLocale } from 'compiled-i18n';
import { component$, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { Modal, Input } from '@greghowe79/the-lib';
import { validateEmail, validatePassword } from '~/utility/validators';
import { useAuth } from '~/hooks/useSignUp';
import { Link, useNavigate } from '@builder.io/qwik-city';

export const Login = component$(() => {
  useStyles$(styles);
  const nav = useNavigate();
  const currentLocale = getLocale();
  const { open, email, password, emailError, passwordError, emailTouched, passwordTouched, isLoading, isSubmitDisabled, handleAuth } =
    useAuth('LOGIN', nav);

  return (
    <div class="form-container">
      <Link href={`/${currentLocale}`} class="back_button">
        ← {_('form_back_home')}
      </Link>
      <Modal
        open={open}
        title={_('navbar_login')}
        closeButtonVisible={false}
        primaryAction={handleAuth}
        isLoading={isLoading}
        primaryButtonLabel={_('navbar_login')}
        primaryButtonDisabled={isSubmitDisabled}
        type="small"
        light
      >
        <form class="form">
          <Input
            id="input_email"
            type="email"
            placeholder="Email"
            value={email}
            error={emailError}
            onValidate$={async (value) => {
              emailError.value = await validateEmail(value);
              return emailError.value!;
            }}
            onInput$={() => (emailTouched.value = true)}
          />

          <Input
            id="input_password"
            type="password"
            placeholder="Enter your password"
            value={password}
            error={passwordError}
            onValidate$={async (value) => {
              passwordError.value = await validatePassword(value);
              return passwordError.value!;
            }}
            onInput$={() => (passwordTouched.value = true)}
          />
          <Link href={`/${currentLocale}/${_('slug_reset_password')}`} aria-label="reset-password" class="reset_password">
            {_('form_reset_password')}
          </Link>
        </form>
      </Modal>
    </div>
  );
});
