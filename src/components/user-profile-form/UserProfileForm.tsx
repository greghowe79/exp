import { $, component$, noSerialize, useSignal, useStyles$ } from '@builder.io/qwik';
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
import { XIcon } from '~/assets/twitter';
import { FaGlobe } from '~/assets/world';
import { YouTube } from '~/assets/youtube';
import { Instagram } from '~/assets/instagram';
import { GitHub } from '~/assets/github';
import { getListColor } from '~/data/ba_color';
import { avatars } from '~/data/avatars';

export async function urlToFile(url: string, filename: string, mimeType: string): Promise<File> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  return new File([buffer], filename, { type: mimeType });
}

const UserProfileForm = component$(() => {
  const nav = useNavigate();
  const selectedAvatar = useSignal<string | null>(null);
  const colors = getListColor();

  useStyles$(styles);

  const {
    serviceTitle,
    serviceDescription,
    servicePrimaryName,
    serviceSecondaryName,
    serviceTertiaryName,
    servicePrimaryPercent,
    serviceSecondaryPercent,
    serviceTertiaryPercent,
    bgColor,
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
    twitter,
    youtube,
    instagram,
    github,
    website,
    position,
    isLoading,
    isSubmitDisabled,
    handleAuth,
    selectedAvatarFile,
  } = useAuth('USER_PROFILE', nav);

  const handleSelect$ = $(async (avatarValue: string) => {
    const avatar = avatars.find((a) => a.value === avatarValue);
    if (!avatar) return;

    selectedAvatar.value = avatar.value;

    const file = await urlToFile(avatar.url, `${avatar.value}.png`, 'image/png');
    selectedAvatarFile.value = noSerialize(file);
  });

  return (
    <form preventdefault:submit onSubmit$={handleAuth} class="form">
      <div class="contact_form-section">
        <h2 class="contact_form-section-title">{_('main_contact_title')}</h2>
        <p class="contact_form-section-description">{_('main_contact_description')}</p>

        <div class="contact-entry">
          <Input id="input_file_user_upload" type="file" currentFile={currentFile} selectedFile={selectedFile} />
          <div>
            <h2>Scegli il tuo avatar</h2>

            <div class="avatar-container">
              {avatars.map((avatar) => (
                <div class="avatar-item" key={avatar.value}>
                  <img
                    src={avatar.url}
                    alt={avatar.label}
                    width={120}
                    height={120}
                    class={`avatar-image ${selectedAvatar.value === avatar.value ? 'selected' : ''}`}
                    onClick$={() => handleSelect$(avatar.value)}
                  />
                  <div class="avatar-label">{avatar.label}</div>
                </div>
              ))}
            </div>
            <div class="avatar-selected">
              Avatar selezionato:
              <strong>{avatars.find((a) => a.value === selectedAvatar.value)?.label ?? 'Nessuno'}</strong>
            </div>
          </div>

          <Input
            id="firstName_user_profile"
            type="text"
            placeholder={_('user_profile_name')}
            value={firstName}
            bgLight
            label={_('user_profile_name')}
            required
          />
          <Input
            id="lastName_user_profile"
            type="text"
            placeholder={_('user_profile_lastname')}
            value={lastName}
            label={_('user_profile_lastname')}
            bgLight
            required
          />
          <Input
            id="job_user_profile"
            type="text"
            placeholder={_('user_profile_job')}
            value={jobTitle}
            bgLight
            label={_('user_profile_job')}
            required
          />

          <TextArea
            id="description_user_profile"
            content={description}
            required
            bgLight
            placeholder={_('user_profile_summary')}
            title={_('user_profile_summary')}
          />

          <Input
            id="input_email_user_profile"
            type="email"
            placeholder="Email *"
            label="Email *"
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
            autocomplete="email"
          />
          <Select id="country" label={_('user_profile_country')} options={options} selected={selectedCountry} prefix={prefix} />
          <Input
            id="telephone_user_profile"
            type="tel"
            placeholder={_('user_profile_phone')}
            label={_('user_profile_phone')}
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
            id="website_user_profile"
            type="url"
            label={_('user_profile_website')}
            placeholder={`https://www.${_('user_profile_website')}.com`}
            value={website}
            icon={FaGlobe}
            bgLight
          />

          <Input
            id="position_user_profile"
            type="text"
            placeholder={_('user_profile_position')}
            value={position}
            icon={Marker}
            label={_('user_profile_position')}
            bgLight
          />

          <div>
            <h2>{_('choose_background_color')}</h2>

            <fieldset class="color-selection">
              <legend class="sr-only">{_('choose_background_color')}</legend>
              {colors.map(({ label, value }) => {
                return (
                  <div key={value}>
                    <Input
                      key={value}
                      id={`color-${value}`}
                      nameAttribute="bg-color"
                      color={value}
                      label={label}
                      selectedValue={bgColor}
                      type="radio"
                    />
                  </div>
                );
              })}
            </fieldset>

            <p>
              {_('selected_color')} <strong>{colors.find((c) => c.value === bgColor.value)?.label ?? bgColor.value}</strong>
            </p>
            <div
              class="color-preview"
              style={{
                backgroundColor: bgColor.value,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div class="service_form-section">
        <h3 class="service_form-section-title">{_('main_services')}</h3>
        <p class="service_form-section-description">{_('main_services_description')}</p>

        <div class="service-entry">
          <Input
            id="service_section-title"
            type="text"
            placeholder="Titolo sezione servizi"
            value={serviceTitle}
            label="Titolo sezione servizi"
            bgLight
            required
          />

          <TextArea
            id="service_description"
            content={serviceDescription}
            required
            bgLight
            placeholder="Inserisci una descrizione dei tuoi servizi "
            title="Inserisci una descrizione dei tuoi servizi "
          />
          <Input
            id="service_primary_name"
            type="text"
            label="Nome servizio primario"
            placeholder="Nome servizio (es. Consulenza Legale)"
            value={servicePrimaryName}
            bgLight
          />
          <Input
            id="service_primary_percent"
            type="number"
            placeholder="Percentuale (es. 80)"
            value={servicePrimaryPercent}
            label="Percentuale (es. 80)"
            bgLight
          />
        </div>

        <div class="service-entry">
          <Input
            id="service_secondary_name"
            type="text"
            label="Nome servizio secondario"
            placeholder="Nome servizio (es. Coaching Personale)"
            value={serviceSecondaryName}
            bgLight
          />
          <Input
            id="service_secondary_percent"
            type="number"
            placeholder="Percentuale (es. 90)"
            value={serviceSecondaryPercent}
            label="Percentuale (es. 90)"
            bgLight
          />
        </div>

        <div class="service-entry">
          <Input
            id="service_tertiary_name"
            type="text"
            label="Nome servizio terziario"
            placeholder="Nome servizio (es. Traduzione Professionale)"
            value={serviceTertiaryName}
            bgLight
          />
          <Input
            id="service_tertiary_percent"
            type="number"
            placeholder="Percentuale (es. 75)"
            value={serviceTertiaryPercent}
            label="Percentuale (es. 75)"
            bgLight
          />
        </div>
      </div>

      <div class="channel_form-section">
        <h3 class="channel_form-section-title">{_('main_channel_title')}</h3>
        <p class="channel_form-section-description">{_('main-channel_description')}</p>

        <div class="channel-entry">
          <Input
            id="facebook_user_profile"
            type="url"
            label="Facebook"
            placeholder={`https://www.facebook.com/${_('user_profile_social')}`}
            value={facebook}
            icon={Facebook}
            bgLight
          />
          <Input
            id="linkedin_user_profile"
            type="url"
            label="LinkedIn"
            placeholder={`https://www.linkedin.com/${_('user_profile_social')}`}
            value={linkedin}
            icon={Linkedin}
            bgLight
          />
          <Input
            id="x_user_profile"
            type="url"
            label="X (ex Twitter)"
            placeholder={`https://x.com/${_('user_profile_social')}`}
            value={twitter}
            icon={XIcon}
            bgLight
          />
          <Input
            id="instagram_user_profile"
            type="url"
            label="Instagram"
            placeholder={`https://www.instagram.com/${_('user_profile_social')}`}
            value={instagram}
            icon={Instagram}
            bgLight
          />
          <Input
            id="github_user_profile"
            type="url"
            label="GitHub"
            placeholder={`https://github.com/${_('user_profile_social')}`}
            value={github}
            icon={GitHub}
            bgLight
          />
          <Input
            id="youtube_user_profile"
            type="url"
            label="YouTube"
            placeholder={`https://www.youtube.com/${_('user_profile_youtube')}`}
            value={youtube}
            icon={YouTube}
            bgLight
          />
        </div>
      </div>
      <Button id="save_user_form" type="submit" label="Salva" size="sm" isLoading={isLoading} disabled={isSubmitDisabled.value}></Button>
    </form>
  );
});

export default UserProfileForm;
