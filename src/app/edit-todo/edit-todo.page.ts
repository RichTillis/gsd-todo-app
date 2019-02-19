import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";

import { Todo } from "../interfaces/todo.interface";
import { TodoService } from "../services/todo.service";

@Component({
  selector: "app-edit-todo",
  templateUrl: "./edit-todo.page.html",
  styleUrls: ["./edit-todo.page.scss"]
})
export class EditTodoPage implements OnInit {
  public todo: Todo;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    private todoService: TodoService
  ) {
    let newDate = new Date().toUTCString();
    this.todo = {
      id: newDate,
      title: "",
      group: "",
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
    //this should be a promise
    this.todoService.updateTodo(this.todo);
    //then the successful toast and redirect
    this.saveSuccessfulToast();
    this.router.navigateByUrl('/home/todo');
  }

  goBack() {
    this.router.navigateByUrl('/home/todo');
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
