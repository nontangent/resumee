import * as express from 'express';
import * as settings from '../settings';
export const router = express.Router()

import { router as uploadRouter } from './upload';
import { router as resumesRouter } from './resumes';

router.use('/upload', uploadRouter);
router.use('/resumes', resumesRouter);
