import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

import { TodoService } from "../services/todo.service";
import { Todo } from "../interfaces/todo.interface";

@Component({
  selector: "app-create-todo",
  templateUrl: "./create-todo.page.html",
  styleUrls: ["./create-todo.page.scss"]
})
export class CreateTodoPage implements OnInit {
  public todo: Todo;

  constructor(
    private modalCtrl: ModalController,
    private todoService: TodoService
  ) {}

  ngOnInit() {
    let newDate = new Date().toUTCString();

    this.todo = {
      id: newDate,
      title: "",
      details: "",
      isCompleted: false,
      createdAt: newDate,
      completedAt: ""
    };
  }

  save(): void {
    this.todoService.createTodo(this.todo);
    this.close();
  }
  close(): void {
    this.modalCtrl.dismiss();
  }
}
