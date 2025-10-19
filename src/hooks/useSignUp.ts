import { $, useComputed$, useSignal, useContext, type NoSerialize, useVisibleTask$ } from '@builder.io/qwik';
import { PopupContext, type UserProfile, UserSessionContext } from '~/root';
// import { _, getLocale } from 'compiled-i18n';
import { getLocale } from 'compiled-i18n';
import { AuthService } from '~/services/auth.service';
import type { RouteNavigate } from '@builder.io/qwik-city';
import { getListColor } from '~/data/ba_color';
import { supabase } from '~/lib/db';

export const useAuth = (type: string, t: Record<string, string>, navigate?: RouteNavigate, locale?: string) => {
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
  const currentFile = useSignal<File | null>(null);
  const selectedAvatarFile = useSignal<NoSerialize<File> | null>(null);
  const imgUrl = useSignal('');
  const avatarImgUrl = useSignal('');
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
  const github = useSignal<string>('');
  const website = useSignal<string>('');
  const serviceTitle = useSignal<string>('');
  const serviceDescription = useSignal<string>('');
  const servicePrimaryName = useSignal<string>('');
  const serviceSecondaryName = useSignal<string>('');
  const serviceTertiaryName = useSignal<string>('');
  const servicePrimaryPercent = useSignal<string>('');
  const serviceSecondaryPercent = useSignal<string>('');
  const serviceTertiaryPercent = useSignal<string>('');

  const firstSuccessfulCaseTitle = useSignal('');
  const firstSuccessfulCaseDescription = useSignal('');
  const secondSuccessfulCaseTitle = useSignal('');
  const secondSuccessfulCaseDescription = useSignal('');
  const thirdSuccessfulCaseTitle = useSignal('');
  const thirdSuccessfulCaseDescription = useSignal('');

  const colors = getListColor(locale || 'en_US');
  const bgColor = useSignal(colors[0].value);
  const position = useSignal('');
  /// const CDNURL = 'https://durdisjtkedteoqbwyfd.supabase.co/storage/v1/object/public/professionals/';

  const CDNURL = import.meta.env.SUPABASE_BUCKET_URL || 'https://durdisjtkedteoqbwyfd.supabase.co/storage/v1/object/public/professionals/';
  // const selectedFile = useSignal(_('user_profile_image'));
  const selectedFile = useSignal(t.user_profile_image);
  const currentLocale = getLocale();

  const positionError = useSignal<string | null>(null);
  const isValidLocation = useSignal(false);
  const currentStep = useSignal(1);

  const hasWebsite = useSignal(false);
  const isInitialized = useSignal(false);
  const selectedAvatar = useSignal<string | null>(null);

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(async () => {
    if (type !== 'USER_PROFILE') return;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      isInitialized.value = true;
      return;
    }

    userSession.userId = session.user.id;

    const { data, error } = await supabase.from('professionals').select('*').eq('id', userSession.userId).maybeSingle();

    if (error) {
      console.error(error);
      hasWebsite.value = false;
      isInitialized.value = true;
      return;
    }

    if (data) {
      hasWebsite.value = true;
      firstName.value = data.first_name ?? '';
      lastName.value = data.last_name ?? '';
      jobTitle.value = data.job_title ?? '';
      description.value = data.description ?? '';
      email.value = data.email ?? '';
      phone.value = data.telephone ?? '';
      website.value = data.website ?? '';
      facebook.value = data.facebook ?? '';
      linkedin.value = data.linkedin ?? '';
      twitter.value = data.twitter ?? '';
      youtube.value = data.youtube ?? '';
      instagram.value = data.instagram ?? '';
      github.value = data.github ?? '';
      serviceTitle.value = data.service_title ?? '';
      serviceDescription.value = data.service_description ?? '';
      servicePrimaryName.value = data.service_primary_name ?? '';
      serviceSecondaryName.value = data.service_secondary_name ?? '';
      serviceTertiaryName.value = data.service_tertiary_name ?? '';
      servicePrimaryPercent.value = data.service_primary_percent ?? '';
      serviceSecondaryPercent.value = data.service_secondary_percent ?? '';
      serviceTertiaryPercent.value = data.service_tertiary_percent ?? '';
      bgColor.value = data.bg_color ?? colors[0].value;
      position.value = data.position ?? '';
      firstSuccessfulCaseTitle.value = data.first_successful_case_title ?? '';
      firstSuccessfulCaseDescription.value = data.first_successful_case_description ?? '';
      secondSuccessfulCaseTitle.value = data.second_successful_case_title ?? '';
      secondSuccessfulCaseDescription.value = data.second_successful_case_description ?? '';
      thirdSuccessfulCaseTitle.value = data.third_successful_case_title ?? '';
      thirdSuccessfulCaseDescription.value = data.third_successful_case_description ?? '';
      imgUrl.value = data.img_url ?? '';
      avatarImgUrl.value = data.avatar_img_url ?? '';
      selectedAvatar.value = data.avatar_name ?? '';
    } else {
      hasWebsite.value = false;
    }

    isInitialized.value = true;
  });

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
      const requiredFieldsStepOne = [
        currentFile.value || imgUrl.value,
        selectedAvatarFile.value || selectedAvatar.value,
        firstName.value.trim(),
        lastName.value.trim(),
        jobTitle.value.trim(),
        description.value.trim(),
        email.value.trim(),
        bgColor.value.trim(),
        position.value.trim(),
      ];
      const firstStepsRequiredFields = requiredFieldsStepOne.some((field) => !field);

      const requiredFieldsStepTwo = [
        serviceTitle.value.trim(),
        serviceDescription.value.trim(),
        servicePrimaryName.value.trim(),
        servicePrimaryPercent.value.trim(),
        serviceSecondaryName.value.trim(),
        serviceSecondaryPercent.value.trim(),
        serviceTertiaryName.value.trim(),
        serviceTertiaryPercent.value.trim(),
      ];

      const secondStepsRequiredFields = requiredFieldsStepTwo.some((field) => !field);

      const requiredFieldsStepFourth = [
        firstSuccessfulCaseTitle.value.trim(),
        firstSuccessfulCaseDescription.value.trim(),
        secondSuccessfulCaseTitle.value.trim(),
        secondSuccessfulCaseDescription.value.trim(),
        thirdSuccessfulCaseTitle.value.trim(),
        thirdSuccessfulCaseDescription.value.trim(),
      ];

      const fourthStepsRequiredFields = requiredFieldsStepFourth.some((field) => !field);

      return (
        !!emailError.value ||
        !!phoneError.value ||
        !!positionError.value ||
        isLoading.value ||
        firstStepsRequiredFields ||
        (currentStep.value === 2 && secondStepsRequiredFields) ||
        (currentStep.value === 4 && fourthStepsRequiredFields)
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
          // title: _('popup.genericErrorTitle'),
          title: t['popup.genericErrorTitle'],
          // description: 'Email già utilizzata',
          description: t['popup.emailAlreadyInUse'],
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
            // title: _('popup.genericSuccessTitle'),
            title: t['popup.genericSuccessTitle'],
            // description: _('popup.signupDescription'),
            description: t['popup.signupDescription'],
            isSuccess: true,
            // redirectAfterClose: `/${currentLocale}/${_('slug_login')}/`,
            redirectAfterClose: `/${currentLocale}/${t.slug_login}/`,
          });
          email.value = '';
          password.value = '';
          isLoading.value = false;
          open.value = false;
        }
      } catch (error: any) {
        popupContext.open('RESULT_POPUP', {
          // title: _('popup.genericErrorTitle'),
          title: t['popup.genericErrorTitle'],
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
          await navigate?.(`/${currentLocale}/`);
          email.value = '';
          password.value = '';
          isLoading.value = false;
          open.value = false;
        }
      } catch (error: any) {
        popupContext.open('RESULT_POPUP', {
          // title: _('popup.genericErrorTitle'),
          title: t['popup.genericErrorTitle'],
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
        await AuthService.resetPassword(email.value, currentLocale, t);

        popupContext.open('RESULT_POPUP', {
          // title: _('popup.genericSuccessTitle'),
          title: t['popup.genericSuccessTitle'],
          // description: _('popup.reset_password_description'),
          description: t['popup.reset_password_description'],
          isSuccess: true,
          redirectAfterClose: `/${currentLocale}/`,
        });
        email.value = '';
        isLoading.value = false;
        open.value = false;
      } catch (error: any) {
        popupContext.open('RESULT_POPUP', {
          // title: _('popup.genericErrorTitle'),
          title: t['popup.genericErrorTitle'],
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
          // title: _('popup.genericSuccessTitle'),
          title: t['popup.genericSuccessTitle'],
          // description: _('popup.update_password_description'),
          description: t['popup.update_password_description'],
          isSuccess: true,
          // redirectAfterClose: `/${currentLocale}/${_('slug_login')}/`,
          redirectAfterClose: `/${currentLocale}/${t.slug_login}/`,
        });
        password.value = '';
        isLoading.value = false;
        open.value = false;
      } catch (error: any) {
        popupContext.open('RESULT_POPUP', {
          // title: _('popup.genericErrorTitle'),
          title: t['popup.genericErrorTitle'],
          description: error.message,
          isSuccess: false,
        });
        password.value = '';
        isLoading.value = false;
      }
    }

    function normalizeSocial(value: string) {
      return value.trim() ? value.trim() : null;
    }

    function normalizePhone(prefix: string, phone: string) {
      const full = `${prefix.trim()} ${phone.trim()}`.trim();
      return full ? full : null;
    }

    if (type === 'USER_PROFILE') {
      isLoading.value = true;

      try {
        if (!userSession.userId) throw new Error('User ID mancante');

        await AuthService.uploadImageProfileToTheStorage(userSession, currentFile, imgUrl, CDNURL, 'profile');
        await AuthService.uploadImageProfileToTheStorage(userSession, selectedAvatarFile, avatarImgUrl, CDNURL, 'avatar');

        const currentDate = new Date().toISOString();

        const { data } = await supabase.from('profiles').select('has_access').eq('id', userSession.userId).maybeSingle();

        const userProfile: UserProfile = {
          id: userSession.userId,
          img_url: imgUrl.value,
          avatar_img_url: avatarImgUrl.value,
          first_name: firstName.value,
          last_name: lastName.value,
          job_title: jobTitle.value,
          description: description.value,
          email: email.value,
          telephone: normalizePhone(prefix.value, phone.value),
          facebook: normalizeSocial(facebook.value),
          linkedin: normalizeSocial(linkedin.value),
          twitter: normalizeSocial(twitter.value),
          youtube: normalizeSocial(youtube.value),
          instagram: normalizeSocial(instagram.value),
          github: normalizeSocial(github.value),
          website: normalizeSocial(website.value),
          service_title: serviceTitle.value,
          service_description: serviceDescription.value,
          service_primary_name: servicePrimaryName.value,
          service_secondary_name: serviceSecondaryName.value,
          service_tertiary_name: serviceTertiaryName.value,
          service_primary_percent: servicePrimaryPercent.value,
          service_secondary_percent: serviceSecondaryPercent.value,
          service_tertiary_percent: serviceTertiaryPercent.value,
          bg_color: bgColor.value,
          position: position.value,
          first_successful_case_title: firstSuccessfulCaseTitle.value,
          first_successful_case_description: firstSuccessfulCaseDescription.value,
          second_successful_case_title: secondSuccessfulCaseTitle.value,
          second_successful_case_description: secondSuccessfulCaseDescription.value,
          third_successful_case_title: thirdSuccessfulCaseTitle.value,
          third_successful_case_description: thirdSuccessfulCaseDescription.value,
          has_access: data?.has_access,
          avatar_name: selectedAvatar.value,
          created_at: currentDate,
        };

        //await AuthService.insertUser(userProfile);

        if (hasWebsite.value) {
          // UPDATE record esistente
          const { error } = await supabase.from('professionals').update(userProfile).eq('id', userSession.userId);

          if (error) {
            throw new Error(error.message);
          }
        } else {
          // INSERT nuovo record
          await AuthService.insertUser(userProfile);
        }

        data?.has_access
          ? // ? await navigate?.(`/${currentLocale}/${_('slug_website')}/${userSession.userId}`)
            await navigate?.(`/${currentLocale}/${t.slug_website}/${userSession.userId}`)
          : // : await navigate?.(`/${currentLocale}/${_('slug_preview')}/${userSession.userId}`);
            await navigate?.(`/${currentLocale}/${t.slug_preview}/${userSession.userId}`);
      } catch (error: any) {
        // let errorMessage = _('generic_errorMessage');
        let errorMessage = t.generic_errorMessage;

        if (error?.message === 'User ID mancante') {
          // errorMessage = _('popup.userIdMissing');
          errorMessage = t['popup.userIdMissing'];
        }

        popupContext.open('RESULT_POPUP', {
          // title: _('popup.genericErrorTitle'),
          title: t['popup.genericErrorTitle'],

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
        // selectedFile.value = _('user_profile_image');
        selectedFile.value = t.user_profile_image;
        selectedCountry.value = '';
        prefix.value = '';
        facebook.value = '';
        linkedin.value = '';
        twitter.value = '';
        youtube.value = '';
        instagram.value = '';
        github.value = '';
        website.value = '';
        serviceTitle.value = '';
        serviceDescription.value = '';
        servicePrimaryName.value = '';
        serviceSecondaryName.value = '';
        serviceTertiaryName.value = '';
        servicePrimaryPercent.value = '';
        serviceSecondaryPercent.value = '';
        serviceTertiaryPercent.value = '';
        bgColor.value = '';
        position.value = '';
        currentFile.value = null;
        imgUrl.value = '';
        avatarImgUrl.value = '';
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
    github,
    website,
    serviceTitle,
    serviceDescription,
    servicePrimaryName,
    serviceSecondaryName,
    serviceTertiaryName,
    servicePrimaryPercent,
    serviceSecondaryPercent,
    serviceTertiaryPercent,
    bgColor,
    position,
    isLoading,
    isSubmitDisabled,
    handleAuth,
    selectedAvatarFile,
    positionError,
    isValidLocation,
    currentStep,
    firstSuccessfulCaseTitle,
    firstSuccessfulCaseDescription,
    secondSuccessfulCaseTitle,
    secondSuccessfulCaseDescription,
    thirdSuccessfulCaseTitle,
    thirdSuccessfulCaseDescription,
    imgUrl,
    selectedAvatar,
  };
};
