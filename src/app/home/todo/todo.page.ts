import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

import { TodoService } from "../../services/todo.service";
import { CreateTodoPage } from "../../create-todo/create-todo.page";
import { Todo } from "../../interfaces/todo.interface";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.page.html",
  styleUrls: ["./todo.page.scss"]
})
export class TodoPage implements OnInit {
  constructor(
    public todoService: TodoService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.todoService.getTodos();
    // console.log(this.todoService.todos);
  }

  filterTodo(todo: Todo) {
    return !todo.isCompleted;
  }

  toggleCompleted(todo: Todo, ev: any) {
    ev.stopPropagation();
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(todo);
  }

  createTodo(): void {
    this.modalCtrl
      .create({
        component: CreateTodoPage
      })
      .then(modal => {
        // modal.onDidDismiss().then(() => {});
        modal.present();
      });
  }
}
