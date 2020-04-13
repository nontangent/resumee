import { join } from 'path';
export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || 4000;
export const DIST_DIR = join(process.cwd(), 'dist/resumee/browser');
export const UPLOAD_DIR = join(DIST_DIR, 'assets/resumes');

