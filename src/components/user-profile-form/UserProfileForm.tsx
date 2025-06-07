import { component$, useSignal, useStyles$ } from '@builder.io/qwik';
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

const UserProfileForm = component$(() => {
  useStyles$(styles);

  const selectedFile = useSignal(_('user_profile_image'));

  const {
    emailError,
    emailTouched,
    phone,
    phoneError,
    phoneTouched,
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
    position,
    isLoading,
    isSubmitDisabled,
    handleAuth,
  } = useAuth('USER_PROFILE');

  const options: Array<{ value: string; label: string }> = [
    { value: '39IT', label: 'Italia (+39)' },
    { value: '33FR', label: 'Francia (+33)' },
    { value: '34ES', label: 'Spagna (+34)' },
    { value: '49DE', label: 'Germania (+49)' },
    { value: '1US', label: 'Stati Uniti (+1)' },
    { value: '44GB', label: 'Regno Unito (+44)' },
    { value: '41CH', label: 'Svizzera (+41)' },
    { value: '43AT', label: 'Austria (+43)' },
    { value: '32BE', label: 'Belgio (+32)' },
    { value: '31NL', label: 'Paesi Bassi (+31)' },
    { value: '351PT', label: 'Portogallo (+351)' },
    { value: '46SE', label: 'Svezia (+46)' },
    { value: '47NO', label: 'Norvegia (+47)' },
    { value: '48PL', label: 'Polonia (+48)' },
    { value: '30GR', label: 'Grecia (+30)' },
  ];

  return (
    <form preventdefault:submit onSubmit$={handleAuth} class="form">
      <Input id="input_file_user_upload" type="file" currentFile={currentFile} selectedFile={selectedFile} />
      <Input id="firstName_user_profile" type="text" placeholder={_('user_profile_name')} value={firstName} bgLight required />
      <Input id="lastName_user_profile" type="text" placeholder={_('user_profile_lastname')} value={lastName} bgLight required />
      <Input id="lastName_user_profile" type="text" placeholder="Job title *" value={jobTitle} bgLight required />

      {/* <label>
        Biografia: <textarea bind:value={description} class="textarea" />
      </label> */}

      <TextArea id="description_user_profile" content={description} required bgLight placeholder="Something about you *" />

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
      <Select id="country" label="Paese o area geografica" options={options} selected={selectedCountry} prefix={prefix} />
      <Input
        id="telephone_user_profile"
        type="tel"
        placeholder="Numero di telefono"
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
        placeholder="https://www.facebook.com/tuoProfilo"
        value={facebook}
        icon={Facebook}
        bgLight
      />
      <Input
        id="linkedin_user_profile"
        type="url"
        placeholder="https://www.linkedin.com/tuoProfilo"
        value={linkedin}
        icon={Linkedin}
        bgLight
      />
      <Input id="position_user_profile" type="url" placeholder="Inserisci la posizione" value={position} icon={Marker} bgLight />

      <Button id="save_user_form" type="submit" label="Salva" size="sm" isLoading={isLoading} disabled={isSubmitDisabled.value}></Button>
    </form>
  );
});

export default UserProfileForm;
