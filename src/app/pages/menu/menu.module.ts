import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      // {
      //   path: 'first',
      //   loadChildren: '../first-with-tabs/first-with-tabs.module#FirstWithTabsPageModule'
      // },
      // {
      //   path: 'second',
      //   loadChildren: '../second/second.module#SecondPageModule'
      // },
      {
        path: 'home',
        loadChildren: '../home/home.module#HomePageModule'
      },
      {
        path: 'categories',
        loadChildren: '../categories/categories.module#CategoriesPageModule'
      },

    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule { }
