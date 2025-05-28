import { component$, useContext } from '@builder.io/qwik';
import { FormContext } from '~/root';
import { useSignal, useStyles$ } from '@builder.io/qwik';
import { _ } from 'compiled-i18n';
import styles from './styles.css?inline';
import { Input, Modal } from '@greghowe79/the-lib';
import { useAuth } from '~/hooks/useSignUp';
import { validatePassword } from '~/utility/validators';

export const UpdatePassword = component$(() => {
  useStyles$(styles);
  const { open, password, passwordError, passwordTouched, isLoading, handleAuth } = useAuth('UPDATE-PASSWORD');
  const isSubmitDisabled = useSignal(true);
  const title = _('form_update_password-title');
  const buttonLabel = _('form_reset_password-button');
  const isFormVisible = useContext(FormContext);

  return (
    <>
      {isFormVisible.value && (
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
            <p>{_('form_update_password-description')}</p>
            <form class="form">
              <Input
                id="input_password"
                type="password"
                placeholder="New password"
                value={password}
                error={passwordError}
                onValidate$={async (value) => {
                  passwordError.value = await validatePassword(value);
                  isSubmitDisabled.value = !!passwordError.value;
                  return passwordError.value!;
                }}
                onInput$={() => (passwordTouched.value = true)}
              />
            </form>
          </Modal>
        </div>
      )}
    </>
  );
});
