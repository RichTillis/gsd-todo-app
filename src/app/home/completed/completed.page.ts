import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

import { Todo } from "../../interfaces/todo.interface";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-completed",
  templateUrl: "./completed.page.html",
  styleUrls: ["./completed.page.scss"]
})
export class CompletedPage implements OnInit {
  private todo: Todo;

  public todos: Todo[];

  constructor(
    public alertController: AlertController,
    public todoService: TodoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.todoService.getTodos();
  }

  filterTodo(todo: Todo) {
    return todo.isCompleted;
  }

  toggleCompleted(todo: Todo, ev: any) {
    ev.stopPropagation();
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(todo);
  }

  routeToEdit(id: number) {
    this.router.navigateByUrl('/edit/' + id);
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

  async presentCreateTodoPrompt() {
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
          placeholder: 'Category'
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
            console.log(data);
            let newDate = new Date().getTime().toString()

            this.todo = {
              id: newDate,
              title: data.title,
              details: "",
              isCompleted: false,
              createdAt: newDate,
              completedAt: ""
            };
            this.todoService.createTodo(this.todo);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }

  goToSettings() {
    this.router.navigateByUrl('/settings');
  }
}
