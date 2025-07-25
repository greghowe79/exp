import { $ } from '@builder.io/qwik';
import { _ } from 'compiled-i18n';


export const validateEmail = $((value: string): string | null => {
  if (value.length === 0) {
    return _('form.errors.inputRequired');
  }
  const isValid = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/.test(value);
  return isValid ? null : _('form.errors.invalidEmail');
});

export const validatePassword = $((value: string): string | null => {
  if (value.length === 0) {
    return _('form.errors.inputRequired');
  }
  const isValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(value);
  return isValid ? null : _('form.errors.invalidPassword');
});

export const validatePhone = $((value: string): string | null => {
  const digitsOnly = value.replace(/\D/g, '');

  if (digitsOnly.length === 0) {
    // Campo vuoto? OK, non obbligatorio → nessun errore.
    return null;
  }

  if (digitsOnly.length < 6) {
    return _('form.errors.invalidPhone');
  }

  return null;
});

