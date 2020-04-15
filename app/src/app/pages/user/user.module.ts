import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component: UserComponent}
]

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
		RouterModule.forChild(routes)
  ]
})
export class UserModule { }
