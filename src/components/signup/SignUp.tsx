// import { _, getLocale } from 'compiled-i18n';
import { getLocale } from 'compiled-i18n';
import { component$, useStyles$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { Button, Modal, Input } from '@greghowe79/the-lib';
import { validateEmail, validatePassword } from '~/utility/validators';
import { useAuth } from '~/hooks/useSignUp';
import { Link } from '@builder.io/qwik-city';

interface TranslationsProps {
  t: Record<string, string>;
}

export const SignUp = component$<TranslationsProps>(({ t }) => {
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
  } = useAuth('SIGNUP', t);

  return (
    <div class="form-container">
      <Link href={`/${currentLocale}`} class="back_button">
        {/* ← {_('form_back_home')} */}← {t.form_back_home}
      </Link>
      <Modal
        open={open}
        //title={_('navbar_signup')}
        title={t.navbar_signup}
        closeButtonVisible={false}
        primaryAction={handleAuth}
        isLoading={isLoading}
        // primaryButtonLabel={formIsVisible.value && _('navbar_signup')}
        primaryButtonLabel={formIsVisible.value ? t.navbar_signup : undefined}
        primaryButtonDisabled={isSubmitDisabled}
        type="small"
        light
      >
        {formIsVisible.value ? (
          <form
            class="form"
            preventdefault:submit
            onSubmit$={async (event) => {
              event.preventDefault();
              emailError.value = await validateEmail(email.value, t);
              passwordError.value = await validatePassword(password.value, t);
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
              value={email}
              error={emailError}
              onValidate$={async (value) => {
                emailError.value = await validateEmail(value, t);
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
                passwordError.value = await validatePassword(value, t);
                return passwordError.value!;
              }}
              onInput$={() => (passwordTouched.value = true)}
            />
            <button class="hidden-button" type="submit" aria-label="submit">
              submit
            </button>
          </form>
        ) : (
          <div class="button-container">
            {/* <Button id="professionista" label={_('customer_type_one')} size="sm" onClick$={() => (formIsVisible.value = true)} /> */}
            <Button id="professionista" label={t.customer_type_one} size="sm" onClick$={() => (formIsVisible.value = true)} />
            {/* <Button
              id="azienda"
              label={_('customer-type_two')}
              size="sm"
              variant="tertiary"
              onClick$={() => (formIsVisible.value = true)}
            /> */}
          </div>
        )}
      </Modal>
    </div>
  );
});
