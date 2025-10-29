import { $ } from '@builder.io/qwik';
// import { _ } from 'compiled-i18n';

export const validateEmail = $((value: string, t: Record<string, string>): string | null => {
  if (value.length === 0) {
    // return _('form.errors.inputRequired');
    return t['form.errors.inputRequired'];
  }
  const isValid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(value);
  // return isValid ? null : _('form.errors.invalidEmail');
  return isValid ? null : t['form.errors.invalidEmail'];
});

export const validatePassword = $((value: string, t: Record<string, string>): string | null => {
  if (value.length === 0) {
    // return _('form.errors.inputRequired');
    return t['form.errors.inputRequired'];
  }
  const isValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(value);
  // return isValid ? null : _('form.errors.invalidPassword');
  return isValid ? null : t['form.errors.invalidPassword'];
});

export const validatePhone = $((value: string, t: Record<string, string>): string | null => {
  const digitsOnly = value.replace(/\D/g, '');

  if (digitsOnly.length === 0) {
    // Campo vuoto? OK, non obbligatorio → nessun errore.
    return null;
  }

  if (digitsOnly.length < 6) {
    // return _('form.errors.invalidPhone');
    return t['form.errors.invalidPhone'];
  }

  return null;
});

export const validatePosition = $((isValidLocation: boolean, t: Record<string, string>): string | null => {
  if (!isValidLocation) {
    // return _('form.errors.invalidPosition');
    return t['form.errors.invalidPosition'];
  }
  return null;
});

type Lang = 'en_US' | 'es_ES' | 'fr_FR' | 'it_IT' | 'ja_JP' | 'pt_PT' | 'zh_CN';

function isLatin(word: string) {
  return /^[A-Za-z]+$/.test(word);
}

export function formatJobTitle(input: string, lang?: string): string {
  if (!input) return '';

  const lower = input.toLowerCase().trim();

  const smallWordsMap: Record<Lang, string[]> = {
    en_US: [
      'of',
      'in',
      'on',
      'at',
      'to',
      'for',
      'from',
      'by',
      'with',
      'about',
      'as',
      'into',
      'through',
      'over',
      'after',
      'before',
      'under',
      'between',
      'and',
      'or',
      'but',
      'the',
      'a',
      'an',
    ],
    es_ES: ['de', 'en', 'a', 'para', 'con', 'por', 'sobre', 'y', 'o', 'pero', 'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas'],
    fr_FR: ['de', 'à', 'en', 'pour', 'avec', 'par', 'sur', 'et', 'ou', 'mais', 'le', 'la', 'les', 'un', 'une', 'des', 'du', 'au'],
    it_IT: [
      'di',
      'in',
      'su',
      'a',
      'per',
      'da',
      'con',
      'tra',
      'fra',
      'e',
      'o',
      'ma',
      'il',
      'lo',
      'la',
      'i',
      'gli',
      'un',
      'uno',
      'una',
      "d'",
      'del',
      'della',
      'dello',
      'dei',
      'degli',
      'delle',
      'presso',
    ],
    ja_JP: [],
    pt_PT: ['de', 'em', 'a', 'para', 'com', 'por', 'sobre', 'e', 'ou', 'mas', 'o', 'a', 'os', 'as', 'um', 'uma', 'uns', 'umas'],
    zh_CN: [],
  };

  const supportedLangs: Lang[] = ['en_US', 'es_ES', 'fr_FR', 'it_IT', 'ja_JP', 'pt_PT', 'zh_CN'];
  const selectedLang: Lang = supportedLangs.includes(lang as Lang) ? (lang as Lang) : 'en_US';
  const smallWords = smallWordsMap[selectedLang];

  return lower
    .replace(/\s+'\s+/g, "'")
    .split(/\s+/)
    .map((word, index) => {
      if (!isLatin(word)) return word;

      if (word.includes("'")) {
        const [before, after] = word.split("'");
        if (before && after) {
          return `${before.toLowerCase()}'${after.charAt(0).toUpperCase()}${after.slice(1)}`;
        }
        return word;
      }

      // se è una small word e non è la prima parola
      if (index !== 0 && smallWords.includes(word)) {
        return word;
      }

      // altrimenti capitalizza
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}
