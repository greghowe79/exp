import { $, useComputed$, useSignal, useContext } from '@builder.io/qwik';
import { PopupContext } from '~/root';
import { _, getLocale } from 'compiled-i18n';
import { AuthService } from '~/services/auth.service';
import { supabase } from '~/lib/db';

export const useSignUp = () => {
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

    const { data, error: emailError } = await supabase.from('profiles').select('*').eq('email', email.value);

    if (emailError) {
      console.error(emailError);
      return;
    }
    if (data.length > 0) {
      // Email già utilizzata
      popupContext.open('RESULT_POPUP', {
        title: _('popup.signupErrorTitle'),
        description: 'Email già utilizzata',
        isSuccess: false,
      });
      isLoading.value = false;
      return;
    }

    try {
      const data = await AuthService.signUp(email.value, password.value);
      const { error } = await supabase
        .from('profiles')
        .insert({ id: 'c251a7d0-0a29-4718-a5da-117b4d163d84', email: email.value, password: password.value });
      if (data.user?.id) {
        popupContext.open('RESULT_POPUP', {
          title: _('popup.signupSuccessTitle'),
          description: _('popup.signupDescription'),
          isSuccess: true,
          redirectAfterClose: `/${currentLocale}/${_('slug_login')}/`,
        });
        email.value = '';
        password.value = '';
        isLoading.value = false;
        open.value = false;
      }
    } catch (error: any) {
      popupContext.open('RESULT_POPUP', {
        title: _('popup.signupErrorTitle'),
        description: error.message,
        isSuccess: false,
      });
      email.value = '';
      password.value = '';
      isLoading.value = false;
    }

    // const { data, error } = await supabase.auth.signUp({
    //   email: email.value,
    //   password: password.value,
    // });
    // console.log('error', error?.message);

    // if (data.user?.id) {
    //   popupContext.open('RESULT_POPUP', {
    //     title: _('popup.signupSuccessTitle'),
    //     description: _('popup.signupDescription'),
    //     isSuccess: true,
    //     redirectAfterClose: `/${currentLocale}/${_('slug_login')}/`,
    //   });
    //   email.value = '';
    //   password.value = '';
    //   isLoading.value = false;
    //   open.value = false;
    // } else {
    //   isLoading.value = false;
    // }
  });

  return {
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
    handleSignUp,
  };
};
