import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
    children: [
      {
        path: "active",
        loadChildren: "./todo/todo.module#TodoPageModule"
      },
      {
        path: "completed",
        loadChildren: "./completed/completed.module#CompletedPageModule"
      }
    ]
  },
  {
    path: "",
    redirectTo: "/tabs/todo",
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
  declarations: [TabsPage]
})
export class TabsPageModule {}
