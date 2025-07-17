import { _, getLocale } from 'compiled-i18n';
import { component$, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { Button, Modal, Input } from '@greghowe79/the-lib';
import { validateEmail, validatePassword } from '~/utility/validators';
import { useAuth } from '~/hooks/useSignUp';
import { Link } from '@builder.io/qwik-city';

export const SignUp = component$(() => {
  const currentLocale = getLocale();
  useStyles$(styles);

  const {
    open,
    formIsVisible,
    email,
    password,
    emailError,
    passwordError,
    emailTouched,
    passwordTouched,
    isLoading,
    isSubmitDisabled,
    handleAuth,
  } = useAuth('SIGNUP');

  return (
    <div class="form-container">
      <Link href={`/${currentLocale}`} class="back_button">
        ← {_('form_back_home')}
      </Link>
      <Modal
        open={open}
        title={_('navbar_signup')}
        closeButtonVisible={false}
        primaryAction={handleAuth}
        isLoading={isLoading}
        primaryButtonLabel={formIsVisible.value && _('navbar_signup')}
        primaryButtonDisabled={isSubmitDisabled}
        type="small"
        light
      >
        {formIsVisible.value ? (
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
          </form>
        ) : (
          <div class="button-container">
            <Button id="professionista" label={_('customer-type_one')} size="sm" onClick$={() => (formIsVisible.value = true)} />
            <Button
              id="azienda"
              label={_('customer-type_two')}
              size="sm"
              variant="tertiary"
              onClick$={() => (formIsVisible.value = true)}
            />
          </div>
        )}
      </Modal>
    </div>
  );
});
