import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
import { _ } from 'compiled-i18n';
import styles from './styles.css?inline';
import { Input, Modal } from '@greghowe79/the-lib';
import { useAuth } from '~/hooks/useSignUp';
import { validateEmail } from '~/utility/validators';

export const ResetPassword = component$(() => {
  useStyles$(styles);
  const { open, email, emailError, emailTouched, isLoading, handleAuth } = useAuth('RESET-PASSWORD');
  const isSubmitDisabled = useSignal(true);
  const title = _('form_reset_password-title');
  const buttonLabel = _('form_reset_password-button');

  return (
    <div class="login-container">
      <Modal
        open={open}
        title={title}
        closeButtonVisible={false}
        primaryAction={handleAuth}
        isLoading={isLoading}
        primaryButtonLabel={buttonLabel}
        primaryButtonDisabled={isSubmitDisabled}
        type="small"
      >
        <p>{_('form_reset_password-description')}</p>
        <form class="form">
          <Input
            id="input_email"
            type="email"
            placeholder="Email"
            value={email}
            error={emailError}
            onValidate$={async (value) => {
              emailError.value = await validateEmail(value);
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
