import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: "tabs",
    component: HomePage,
    children: [
      {
        path: "todo",
        loadChildren: () => import('../todo/todo.module').then(m => m.TodoPageModule)
      },
      {
        path: "completed",
        loadChildren: () => import('../completed/completed.module').then(m => m.CompletedPageModule)
      }
    ]
  },
  {
    path: "",
    redirectTo: "tabs/todo",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
