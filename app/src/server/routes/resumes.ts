import * as express from 'express';
export const router = express.Router();

import * as fs from 'fs';
import { join } from 'path';
import * as hogan from 'hogan.js';

import * as settings from '../settings';
import * as analytics from '../utils/analytics';

const TEMPLATE_PATH = join(settings.DIST_DIR, 'assets/documents', 'resumee.md.template');
const template = hogan.compile(fs.readFileSync(TEMPLATE_PATH, 'utf-8'));

router.get('/resumee.md', async (req, res) => {
	const pv = await analytics.getPV();
	const number = fs.readdirSync(settings.UPLOAD_DIR).length;
	const resumeeMd = template.render({pv: pv, number: number});
	console.log('resumeeMd:', resumeeMd);
	res.status(200);
	res.set('Content-Type', 'text/markdown; charset=UTF-8');
	res.send(resumeeMd);
})

router.get('/*.md', (req, res) => {
	const filename = req.path;
	console.log('filename:', filename);
	const resumeMd = fs.readFileSync(join(settings.UPLOAD_DIR, filename), 'utf-8');
	res.status(200);
	res.set('Content-Type', 'text/markdown; charset=UTF-8');	
	res.send(resumeMd);
})
