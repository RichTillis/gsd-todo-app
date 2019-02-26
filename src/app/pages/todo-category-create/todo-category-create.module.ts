import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TodoCategoryCreatePage } from './todo-category-create.page';

const routes: Routes = [
  {
    path: '',
    component: TodoCategoryCreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TodoCategoryCreatePage]
})
export class TodoCategoryCreatePageModule {}
