import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './_index.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: '', component: IndexComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
		RouterModule.forChild(routes)
  ]
})
export class IndexModule { }
