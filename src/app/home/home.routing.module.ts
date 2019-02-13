import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomePage } from "./home.page";

const routes: Routes = [
  {
    path: "home",
    component: HomePage,
    children: [
      {
        path: "todo",
        children: [
          {
            path: "",
            loadChildren: "./todo/todo.module#TodoPageModule"
          }
        ]
      },
      {
        path: "completed",
        children: [
          {
            path: "",
            loadChildren: "./completed/completed.module#CompletedPageModule"
          }
        ]
      }
    ]
  },
  {
    path: "",
    redirectTo: "/home/todo",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
