import { Component, OnInit } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";

import { CreateTodoPage } from "../../create-todo/create-todo.page";

import { TodoService } from "../../services/todo.service";
import { Todo } from "../../interfaces/todo.interface";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.page.html",
  styleUrls: ["./todo.page.scss"]
})
export class TodoPage implements OnInit {
  constructor(
    public todoService: TodoService,
    private modalCtrl: ModalController,
    public alertController: AlertController
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


  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: 'New Todo',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Whaddua gotta get done?'
        },
        {
          name: 'group',
          type: 'text',
          placeholder: 'group'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log(data)
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
}
