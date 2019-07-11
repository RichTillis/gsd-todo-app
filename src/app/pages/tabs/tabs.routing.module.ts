import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "tabs",
    component: TabsPage,
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
    redirectTo: "/tabs/todo",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
