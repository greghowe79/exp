import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
// import { _, getLocale } from 'compiled-i18n';
import { getLocale } from 'compiled-i18n';
import styles from './styles.css?inline';
import { Input, Modal } from '@greghowe79/the-lib';
import { useAuth } from '~/hooks/useSignUp';
import { validateEmail } from '~/utility/validators';
import { Link } from '@builder.io/qwik-city';

interface TranslationsProps {
  t: Record<string, string>;
}

export const ResetPassword = component$<TranslationsProps>(({ t }) => {
  useStyles$(styles);
  const currentLocale = getLocale();
  const { open, email, emailError, emailTouched, isLoading, handleAuth } = useAuth('RESET-PASSWORD', t);
  const isSubmitDisabled = useSignal(true);
  // const title = _('form_reset_password_title');
  const title = t.form_reset_password_title;
  // const buttonLabel = _('form_reset_password_button');
  const buttonLabel = t.form_reset_password_button;

  return (
    <div class="login-container">
      <Link href={`/${currentLocale}`} class="back_button">
        {/* ← {_('form_back_home')} */}← {t.form_back_home}
      </Link>
      <Modal
        open={open}
        title={title}
        closeButtonVisible={false}
        primaryAction={handleAuth}
        isLoading={isLoading}
        primaryButtonLabel={buttonLabel}
        primaryButtonDisabled={isSubmitDisabled}
        type="small"
        light
      >
        {/* <p>{_('form_reset_password_description')}</p> */}
        <p>{t.form_reset_password_description}</p>
        <form
          class="form"
          preventdefault:submit
          onSubmit$={async (event) => {
            event.preventDefault();
            emailError.value = await validateEmail(email.value, t);
            emailTouched.value = true;

            if (!emailError.value) {
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
              isSubmitDisabled.value = !!emailError.value;
              return emailError.value!;
            }}
            onInput$={() => (emailTouched.value = true)}
          />
        </form>
      </Modal>
    </div>
  );
});
