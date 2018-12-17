import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { TodoPage } from "./todo.page";
import { AppPipesModule } from "../../pipes/pipes.module";
import { CreateTodoPage } from "../../create-todo/create-todo.page";

const routes: Routes = [
  {
    path: "",
    component: TodoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TodoPage],
  entryComponents: [CreateTodoPage]
})
export class TodoPageModule {}
