import { fieldNameToLabel } from '@nish1896/rhf-mui-components/form-helpers';

export function reqdErrorMsg(fieldName: string) {
  return `${fieldNameToLabel(fieldName)} is required.`;
}

export function minLengthErrMsg(fieldName: string, minLength: number) {
  return `${fieldNameToLabel(fieldName)} must contain atleast ${minLength} characters`;
}
