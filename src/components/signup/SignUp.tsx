import { _ } from 'compiled-i18n';
import { $, component$, useSignal, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './styles.css?inline';
import { Button, Modal } from '@greghowe79/the-lib';
//import { Form } from '@builder.io/qwik-city';
import { supabase } from '~/lib/db';

interface messageStore {
  message?: string;
  status: string;
}
export const validateEmail = (email: string) => {
  const regex = new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/);
  if (regex.test(email)) {
    return true;
  }
  return false;
};

export const SignUp = component$(() => {
  useStylesScoped$(styles);
  const open = useSignal(true);
  const formIsVisible = useSignal(false);
  const email = useSignal('');
  const password = useSignal('');
  const messageStore = useStore<messageStore>({ message: '', status: 'error' });
  const isLoading = useSignal(false);

  const handleSignUp = $(async () => {
    // Initialize resets
    messageStore.message = undefined;
    messageStore.status = 'error';
    isLoading.value = true;

    // Value extraction
    const emailValue = email.value;
    //const isTerms = event.target.terms.checked;
    const isEmailValid = validateEmail(emailValue);

    // Email validation
    if (!isEmailValid) {
      messageStore.message = 'You must have a valid email';
      isLoading.value = false;
      return;
    }

    // Terms validation
    // if (!isTerms) {
    //   message.message = 'You must agree to our terms, privacy and disclaimer before signing up';
    //   isLoading.value = false;
    //   return;
    // }

    // Create user in supabase
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });

    // Confirm signup
    if (data.user?.id) {
      messageStore.message = 'Success. Please check your email/spam folder';
      messageStore.status = 'success';
      email.value = '';
      password.value = '';
      isLoading.value = false;
    } else {
      messageStore.message = 'There was a problem creating a user. ' + error?.message;
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
      >
        {formIsVisible.value ? (
          // <h1>{_('navbar_signup')}</h1>
          <form class="form">
            <label>
              <input bind:value={email} type="email" placeholder="Email" class="input" />
            </label>
            <div>{messageStore.message}</div>
            <label>
              <input bind:value={password} placeholder="Password" class="input" />
            </label>

            {/* <div>{messageStore.message}</div> */}
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
