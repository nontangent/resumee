import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', loadChildren: () => import('./_index/_index.module').then(m => m.IndexModule) },
	{ path: ':user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
		RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
