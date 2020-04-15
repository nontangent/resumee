import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http'; 
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';
import { Routes, RouterModule } from "@angular/router";

import { QRCodeModule  } from 'angularx-qrcode';

const routes: Routes = [
	{
		path: '',
		//pathMatch: 'full',
		loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
	},
	{
		path: '**',
		redirectTo: '',
	}
]

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    MarkdownToHtmlModule,
		RouterModule.forRoot(routes),
		QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
