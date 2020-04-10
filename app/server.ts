import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join, extname } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

import { v4 as uuidv4 } from 'uuid';

const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 4200;
const distFolder = join(process.cwd(), 'dist/resumee/browser');
const uploadFolder = join(distFolder, 'assets/resumes');

// File Uploading 
import * as multer from 'multer';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder)
  },
  filename: function (req, file, cb) {
    const filename = uuidv4();
    cb(null, filename + '.md')
  }
});

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 10 * 1024,
    files: 1
  },
  fileFilter: (req, file, cb) => {
    const fileExtname = extname(file.originalname)
    if(fileExtname != '.md') {
      cb(new Error('upload file must be .md'));
      cb(null, false);
    } else{
      cb(null, true);
    }
  },
  rename: function (fieldname, filename) {
    console.log("Rename...");
    return filename + Date.now();
  },
});

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  server.get('/upload', (req, res) => res.sendFile(join(distFolder, 'assets/upload.html')))	

  server.post('/upload', upload.single('file'), (req: any, res) => {
    res.json({
      // target: `http://${HOST}:${PORT}/assets/resumes/${req.file.filename}`
      target: `http://${HOST}:${PORT}/assets/resumes/${req.file.filename}`
    });
  })


  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET')
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, access_token'
    )
    express.static(distFolder, {maxAge: '1y'})(req, res, next);
  });

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  // Start up the Node server
  const server = app();
  server.listen(PORT, () => {
    console.log(`Node Express server listening on http://localhost:${PORT}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
