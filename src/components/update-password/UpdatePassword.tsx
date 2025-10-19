import { component$, useContext } from '@builder.io/qwik';
import { FormContext } from '~/root';
import { useSignal, useStyles$ } from '@builder.io/qwik';
// import { _ } from 'compiled-i18n';
import styles from './styles.css?inline';
import { Input, Modal } from '@greghowe79/the-lib';
import { useAuth } from '~/hooks/useSignUp';
import { validatePassword } from '~/utility/validators';

interface TranslationsProps {
  t: Record<string, string>;
}

export const UpdatePassword = component$<TranslationsProps>(({ t }) => {
  useStyles$(styles);
  const { open, password, passwordError, passwordTouched, isLoading, handleAuth } = useAuth('UPDATE-PASSWORD', t);
  const isSubmitDisabled = useSignal(true);
  // const title = _('form_update_password_title');
  const title = t.form_update_password_title;
  // const buttonLabel = _('form_reset_password_button');
  const buttonLabel = t.form_reset_password_button;
  const isFormVisible = useContext(FormContext);
  console.log('isFormVisible:', isFormVisible.value);

  return (
    <>
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
          {/* <p>{_('form_update_password_description')}</p> */}
          <p>{t.form_update_password_description}</p>
          <form
            class="form"
            preventdefault:submit
            onSubmit$={async (event) => {
              event.preventDefault();
              passwordError.value = await validatePassword(password.value, t);
              passwordTouched.value = true;

              if (!passwordError.value) {
                await handleAuth();
              }
            }}
          >
            <Input
              id="input_password"
              type="password"
              placeholder="New password"
              value={password}
              error={passwordError}
              onValidate$={async (value) => {
                passwordError.value = await validatePassword(value, t);
                isSubmitDisabled.value = !!passwordError.value;
                return passwordError.value!;
              }}
              onInput$={() => (passwordTouched.value = true)}
            />
          </form>
        </Modal>
      </div>
    </>
  );
});
