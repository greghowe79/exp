import { _, getLocale } from 'compiled-i18n';
import { $, component$, useComputed$, useContext, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { Button, Modal, Input } from '@greghowe79/the-lib';
import { supabase } from '~/lib/db';
import { validateEmail, validatePassword } from '~/utility/validators';
import { PopupContext } from '~/root';

export const SignUp = component$(() => {
  useStylesScoped$(styles);
  const open = useSignal(true);
  const formIsVisible = useSignal(false);
  const email = useSignal('');
  const password = useSignal('');
  const emailError = useSignal<string | null>(null);
  const passwordError = useSignal<string | null>(null);
  const emailTouched = useSignal(false);
  const passwordTouched = useSignal(false);
  const isLoading = useSignal(false);
  const popupContext = useContext(PopupContext);
  const currentLocale = getLocale();

  const isSubmitDisabled = useComputed$(() => {
    return !!emailError.value || !emailTouched.value || !!passwordError.value || !passwordTouched.value || isLoading.value;
  });

  const handleSignUp = $(async () => {
    isLoading.value = true;

    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    if (data.user?.id) {
      email.value = '';
      password.value = '';
      isLoading.value = false;
      open.value = false;
      popupContext.open('RESULT_POPUP', {
        title: _('popup.signupTitle'),
        description: _('popup.signupDescription'),
        isSuccess: true,
        redirectAfterClose: `/${currentLocale}/${_('slug_login')}/`,
      });
    } else {
      isLoading.value = false;
    }
  });

  return (
    <div class="login-container">
      <Modal
        open={open}
        title={_('navbar_signup')}
        closeButtonVisible={false}
        primaryAction={handleSignUp}
        isLoading={isLoading}
        primaryButtonLabel={formIsVisible.value && _('navbar_signup')}
        primaryButtonDisabled={isSubmitDisabled}
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
            <Button id="professionista" label="Professionista" size="sm" onClick$={() => (formIsVisible.value = true)} />
            <Button id="azienda" label="Azienda" size="sm" variant="tertiary" onClick$={() => (formIsVisible.value = true)} />
          </div>
        )}
      </Modal>
    </div>
  );
});
