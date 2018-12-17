import { Component, OnInit } from "@angular/core";
import { NavController, ToastController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";

import { Todo } from "../interfaces/todo.interface";

import { TodoService } from "../services/todo.service";

@Component({
  selector: "app-edit-todo",
  templateUrl: "./edit-todo.page.html",
  styleUrls: ["./edit-todo.page.scss"]
})
export class EditTodoPage implements OnInit {
  public todo: Todo;
  private id: string;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private toastController: ToastController,
    private todoService: TodoService
  ) {
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

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    if (id != null) {
      this.todoService.getTodo(id).then(todo => {
        this.todo = todo;
      });
    }
  }

  saveTodo() {
    this.todoService.updateTodo(this.todo);
    this.saveSuccessfulToast();
    this.navCtrl.navigateBack("home");
  }

  toggleCompleted(event) {
    console.log(event);
  }

  async saveSuccessfulToast() {
    const toast = await this.toastController.create({
      message: "Changes saved.",
      duration: 2000,
      position: "bottom",
      color: "tertiary"
    });
    toast.present();
  }
}
