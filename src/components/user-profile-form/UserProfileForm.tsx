import { component$, useStyles$ } from '@builder.io/qwik';
import { Button, Input, Select, TextArea } from '@greghowe79/the-lib';
import { useAuth } from '~/hooks/useSignUp';
import { validateEmail, validatePhone } from '~/utility/validators';
import styles from './styles.css?inline';
import { Facebook } from '~/assets/facebook';
import { Linkedin } from '~/assets/linkedin';
import { Email } from '~/assets/email';
import { Marker } from '~/assets/marker';
import { Mobile } from '~/assets/mobile';
import { _ } from 'compiled-i18n';
import { options } from '~/data/country-code-data';
import { useNavigate } from '@builder.io/qwik-city';

const UserProfileForm = component$(() => {
  const nav = useNavigate();
  useStyles$(styles);

  const {
    emailError,
    emailTouched,
    phone,
    phoneError,
    phoneTouched,
    selectedCountry,
    currentFile,
    selectedFile,
    firstName,
    lastName,
    jobTitle,
    description,
    email,
    prefix,
    facebook,
    linkedin,
    position,
    isLoading,
    isSubmitDisabled,
    handleAuth,
  } = useAuth('USER_PROFILE', nav);

  return (
    <form preventdefault:submit onSubmit$={handleAuth} class="form">
      <Input id="input_file_user_upload" type="file" currentFile={currentFile} selectedFile={selectedFile} />
      <Input id="firstName_user_profile" type="text" placeholder={_('user_profile_name')} value={firstName} bgLight required />
      <Input id="lastName_user_profile" type="text" placeholder={_('user_profile_lastname')} value={lastName} bgLight required />
      <Input id="lastName_user_profile" type="text" placeholder={_('user_profile_job')} value={jobTitle} bgLight required />

      <TextArea id="description_user_profile" content={description} required bgLight placeholder={_('user_profile_summary')} />

      <Input
        id="input_email_user_profile"
        type="email"
        placeholder="Email *"
        value={email}
        error={emailError}
        onValidate$={async (value) => {
          emailError.value = await validateEmail(value);
          return emailError.value!;
        }}
        onInput$={() => (emailTouched.value = true)}
        icon={Email}
        bgLight
        required
      />
      <Select id="country" label={_('user_profile_country')} options={options} selected={selectedCountry} prefix={prefix} />
      <Input
        id="telephone_user_profile"
        type="tel"
        placeholder={_('user_profile_phone')}
        value={phone}
        icon={Mobile}
        prefix={prefix.value}
        onInput$={() => (phoneTouched.value = true)}
        error={phoneError}
        onValidate$={async (value) => {
          phoneError.value = await validatePhone(value);
          return phoneError.value!;
        }}
        bgLight
      />
      <Input
        id="facebook_user_profile"
        type="url"
        placeholder={`https://www.facebook.com/${_('user_profile_social')}`}
        value={facebook}
        icon={Facebook}
        bgLight
      />
      <Input
        id="linkedin_user_profile"
        type="url"
        placeholder={`https://www.linkedin.com/${_('user_profile_social')}`}
        value={linkedin}
        icon={Linkedin}
        bgLight
      />
      <Input id="position_user_profile" type="url" placeholder={_('user_profile_position')} value={position} icon={Marker} bgLight />

      <Button id="save_user_form" type="submit" label="Salva" size="sm" isLoading={isLoading} disabled={isSubmitDisabled.value}></Button>
    </form>
  );
});

export default UserProfileForm;
