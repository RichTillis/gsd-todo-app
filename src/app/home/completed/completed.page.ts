import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";

import { Todo } from "../../interfaces/todo.interface";
import { CreateTodoPage } from "../../create-todo/create-todo.page";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-completed",
  templateUrl: "./completed.page.html",
  styleUrls: ["./completed.page.scss"]
})
export class CompletedPage implements OnInit {
  public todos: Todo[];

  constructor(
    public alertController: AlertController,
    public todoService: TodoService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.todoService.getTodos();
    // console.log(this.todoService.todos);
  }

  filterTodo(todo: Todo) {
    return todo.isCompleted;
  }

  toggleCompleted(todo: Todo, ev: any) {
    ev.stopPropagation();
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(todo);
  }

  deleteTodo(todo: Todo, ev: any) {
    ev.stopPropagation();
    this.presentDeleteConfirm(todo);
  }

  async presentDeleteConfirm(todo: Todo) {
    const alert = await this.alertController.create({
      header: "Delete Todo",
      message: "Are you sure?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Delete cancelled");
          }
        },
        {
          text: "Yes",
          handler: () => {
            this.todoService.deleteTodo(todo.id);
          }
        }
      ]
    });

    await alert.present();
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
