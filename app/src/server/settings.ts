import { join } from 'path';
// import { parser } from './utils';

export function jsonFromBase64(encodedStr) {
  return JSON.parse(Buffer.from(encodedStr, 'base64').toString('ascii'));
}

export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || 4000;
export const DIST_DIR = join(process.cwd(), 'dist/resumee/browser');
export const UPLOAD_DIR = join(DIST_DIR, 'assets/resumes');

export const GOOGLE_CREDENTIAL = jsonFromBase64(process.env.GOOGLE_CREDENTIAL_JSON_BASE64);

// console.log('GOOGLE_CREDENTIAL:', GOOGLE_CREDENTIAL);
console.log('GOOGLE_CREDENTIAL:', GOOGLE_CREDENTIAL.client_email);
console.log('GOOGLE_CREDENTIAL:', GOOGLE_CREDENTIAL.private_key);
export const GOOGLE_CLIENT_EMAIL = GOOGLE_CREDENTIAL.client_email;
export const GOOGLE_PRIVATE_KEY = GOOGLE_CREDENTIAL.private_key;

export const GOOGLE_ANALYTICS_VIEW_ID = process.env.GOOGLE_ANALYTICS_VIEW_ID;
