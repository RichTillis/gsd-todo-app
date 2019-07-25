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
        loadChildren: "../todo/todo.module#TodoPageModule"
      },
      {
        path: "completed",
        loadChildren: "../completed/completed.module#CompletedPageModule"
      }
    ]
  },
  {
    path: "",
    redirectTo: "tabs/todo",
    pathMatch: "full"
  }
];

// const routes: Routes = [
//   {
//     path: '',
//     component: HomePage
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
