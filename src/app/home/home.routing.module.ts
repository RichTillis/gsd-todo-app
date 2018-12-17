import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HomePage } from "./home.page";
import { TodoPage } from "./todo/todo.page";
import { CompletedPage } from "./completed/completed.page";

const routes: Routes = [
  {
    path: "home",
    component: HomePage,
    children: [
      {
        path: "",
        redirectTo: "/home/(todo:todo)",
        pathMatch: "full"
      },
      {
        path: "todo",
        outlet: "todo",
        component: TodoPage
      },
      {
        path: "completed",
        outlet: "completed",
        component: CompletedPage
      }
    ]
  },
  {
    path: "",
    redirectTo: "/home/(todo:todo)",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
