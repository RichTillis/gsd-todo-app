import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";

import { HomePage } from "./home.page";
import { CreateTodoPage } from "../create-todo/create-todo.page";

import { HomePageRoutingModule } from "./home.routing.module";
import { TodoPageModule } from "./todo/todo.module";
import { CompletedPageModule } from "./completed/completed.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TodoPageModule,
    CompletedPageModule
  ],
  declarations: [HomePage, CreateTodoPage]
})
export class HomePageModule {}
