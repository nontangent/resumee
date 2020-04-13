import * as express from 'express';
import * as settings from '../settings';
import { router as uploadRouter } from './upload';
export const router = express.Router()

router.use('/upload', uploadRouter);
