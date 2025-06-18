import { $, useComputed$, useSignal, useContext } from '@builder.io/qwik';
import { ImagesContext, PopupContext, type UserProfile, UserSessionContext } from '~/root';
import { _, getLocale } from 'compiled-i18n';
import { AuthService } from '~/services/auth.service';
import type { RouteNavigate } from '@builder.io/qwik-city';

export const useAuth = (type: string, navigate?: RouteNavigate) => {
  const open = useSignal(true);
  const formIsVisible = useSignal(false);
  const password = useSignal('');
  const phone = useSignal('');
  const emailError = useSignal<string | null>(null);
  const passwordError = useSignal<string | null>(null);
  const phoneError = useSignal<string | null>(null);
  const emailTouched = useSignal(false);
  const passwordTouched = useSignal(false);
  const phoneTouched = useSignal(false);
  const isLoading = useSignal(false);
  const selectedCountry = useSignal('');
  const popupContext = useContext(PopupContext);
  const userSession = useContext(UserSessionContext);
  const images = useContext(ImagesContext);
  const currentFile = useSignal<File | null>(null);
  const imgUrl = useSignal('');
  const firstName = useSignal('');
  const lastName = useSignal('');
  const jobTitle = useSignal('');
  const description = useSignal('');
  const email = useSignal('');
  const prefix = useSignal('');
  const facebook = useSignal<string>('');
  const linkedin = useSignal<string>('');
  const twitter = useSignal<string>('');
  const youtube = useSignal<string>('');
  const instagram = useSignal<string>('');
  const website = useSignal<string>('');
  const position = useSignal('');
  const CDNURL = 'https://durdisjtkedteoqbwyfd.supabase.co/storage/v1/object/public/professionals/';
  const selectedFile = useSignal(_('user_profile_image'));
  const currentLocale = getLocale();

  // const isSubmitDisabled = useComputed$(() => {
  //   return (
  //     !!emailError.value ||
  //     !emailTouched.value ||
  //     !!passwordError.value ||
  //     !passwordTouched.value ||
  //     isLoading.value ||
  //     !email.value ||
  //     !password.value
  //   );
  // });

  const isSubmitDisabled = useComputed$(() => {
    if (type === 'LOGIN' || type === 'SIGNUP' || type === 'UPDATE-PASSWORD') {
      return (
        !!emailError.value ||
        !emailTouched.value ||
        !!passwordError.value ||
        !passwordTouched.value ||
        isLoading.value ||
        !email.value ||
        !password.value
      );
    }

    if (type === 'RESET-PASSWORD') {
      return !!emailError.value || !emailTouched.value || isLoading.value || !email.value;
    }

    if (type === 'USER_PROFILE') {
      const requiredFields = [
        firstName.value.trim(),
        lastName.value.trim(),
        jobTitle.value.trim(),
        description.value.trim(),
        email.value.trim(),
      ];
      const anyEmptyRequired = requiredFields.some((field) => !field);

      return (
        !!emailError.value ||
        !!phoneError.value || // opzionale, ma se invalido → blocca
        isLoading.value ||
        anyEmptyRequired
      );
    }

    // Default fallback
    return isLoading.value;
  });

  const handleAuth = $(async () => {
    if (type === 'SIGNUP') {
      isLoading.value = true;
      const { data, error: emailError } = await AuthService.checkEmailExists(email.value);

      if (emailError) {
        console.error(emailError);
        return;
      }
      if (data.length > 0) {
        popupContext.open('RESULT_POPUP', {
          title: _('popup.genericErrorTitle'),
          description: 'Email già utilizzata',
          isSuccess: false,
        });
        email.value = '';
        password.value = '';
        isLoading.value = false;
        return;
      }

      try {
        const data = await AuthService.signUp(email.value, password.value);

        if (data.user?.id) {
          popupContext.open('RESULT_POPUP', {
            title: _('popup.genericSuccessTitle'),
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
          title: _('popup.genericErrorTitle'),
          description: error.message,
          isSuccess: false,
        });
        email.value = '';
        password.value = '';
        isLoading.value = false;
      }
    }
    if (type === 'LOGIN') {
      isLoading.value = true;
      try {
        const data = await AuthService.signInWithPassword(email.value, password.value);

        if (data.user.id) {
          await navigate?.(`/${currentLocale}/${_('slug_dashboard')}/${data.user.id}`);
          email.value = '';
          password.value = '';
          isLoading.value = false;
          open.value = false;
        }
      } catch (error: any) {
        popupContext.open('RESULT_POPUP', {
          title: _('popup.genericErrorTitle'),
          description: error.message,
          isSuccess: false,
        });
        email.value = '';
        password.value = '';
        isLoading.value = false;
      }
    }
    if (type === 'RESET-PASSWORD') {
      isLoading.value = true;
      try {
        await AuthService.resetPassword(email.value, currentLocale);

        popupContext.open('RESULT_POPUP', {
          title: _('popup.genericSuccessTitle'),
          description: _('popup.reset_password_description'),
          isSuccess: true,
          redirectAfterClose: `/${currentLocale}/`,
        });
        email.value = '';
        isLoading.value = false;
        open.value = false;
      } catch (error: any) {
        popupContext.open('RESULT_POPUP', {
          title: _('popup.genericErrorTitle'),
          description: error.message,
          isSuccess: false,
        });
        email.value = '';
        isLoading.value = false;
      }
    }

    if (type === 'UPDATE-PASSWORD') {
      isLoading.value = true;
      try {
        await AuthService.updatePassword(password.value);

        popupContext.open('RESULT_POPUP', {
          title: _('popup.genericSuccessTitle'),
          description: _('popup.update_password_description'),
          isSuccess: true,
          redirectAfterClose: `/${currentLocale}/${_('slug_login')}/`,
        });
        password.value = '';
        isLoading.value = false;
        open.value = false;
      } catch (error: any) {
        popupContext.open('RESULT_POPUP', {
          title: _('popup.genericErrorTitle'),
          description: error.message,
          isSuccess: false,
        });
        password.value = '';
        isLoading.value = false;
      }
    }

    if (type === 'USER_PROFILE') {
      isLoading.value = true;

      try {
        if (!userSession.userId) throw new Error('User ID mancante');

        await AuthService.uploadImageProfileToTheStorage(userSession, currentFile, imgUrl, images, CDNURL);

        const currentDate = new Date().toISOString();
        const userProfile: UserProfile = {
          id: userSession.userId,
          img_url: imgUrl.value,
          first_name: firstName.value,
          last_name: lastName.value,
          job_title: jobTitle.value,
          description: description.value,
          email: email.value,
          telephone: `${prefix.value.trim()} ${phone.value.trim()}`,
          facebook: facebook.value,
          linkedin: linkedin.value,
          twitter: twitter.value,
          youtube: youtube.value,
          instagram: instagram.value,
          website: website.value,
          position: position.value,
          created_at: currentDate,
        };

        await AuthService.insertUser(userProfile);
        await navigate?.(`/${currentLocale}/${_('slug_preview')}/${userSession.userId}`);
      } catch (error: any) {
        let errorMessage = _('generic_errorMessage');

        if (error?.message === 'User ID mancante') {
          errorMessage = _('popup.userIdMissing');
        }

        popupContext.open('RESULT_POPUP', {
          title: _('popup.genericErrorTitle'),
          description: errorMessage,
          isSuccess: false,
        });

        // Reset campi
        email.value = '';
        firstName.value = '';
        lastName.value = '';
        jobTitle.value = '';
        description.value = '';
        phone.value = '';
        selectedFile.value = _('user_profile_image');
        selectedCountry.value = '';
        prefix.value = '';
        facebook.value = '';
        linkedin.value = '';
        twitter.value = '';
        youtube.value = '';
        instagram.value = '';
        website.value = '';
        position.value = '';
        currentFile.value = null;
        imgUrl.value = '';
      } finally {
        isLoading.value = false;
      }
    }
  });

  return {
    open,
    formIsVisible,
    password,
    phone,
    emailError,
    passwordError,
    phoneError,
    emailTouched,
    passwordTouched,
    phoneTouched,
    selectedFile,
    selectedCountry,
    currentFile,
    firstName,
    lastName,
    jobTitle,
    description,
    email,
    prefix,
    facebook,
    linkedin,
    twitter,
    youtube,
    instagram,
    website,
    position,
    isLoading,
    isSubmitDisabled,
    handleAuth,
  };
};
