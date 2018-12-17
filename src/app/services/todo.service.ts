import { Injectable } from "@angular/core";

import { Todo } from "../interfaces/todo.interface";
import { AlertController } from "@ionic/angular";

import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  public todos: Todo[];

  constructor(
    private storageService: StorageService,
    public alertController: AlertController
  ) {}

  getTodo(id: string): Promise<any> {
    return this.storageService.getTodo(id);
  }

  getTodos() {
    this.storageService.getTodos().then(todos => {
      this.todos = todos;
      console.log(this.todos);
    });
  }

  updateTodo(todo: Todo) {
    this.storageService.updateTodo(todo).then(() => {
      this.getTodos();
    });
  }

  deleteTodo(id: string) {
    this.storageService.deleteTodo(id).then(() => {
      this.getTodos();
    });
  }

  createTodo(newTodo: Todo): void {
    // this.presentCreateTodoPrompt().then(() => {
    //   this.getTodos();
    // });
    this.storageService.createTodo(newTodo).then(() => {
      this.getTodos();
    });
  }

  async presentCreateTodoPrompt() {
    const alert = await this.alertController.create({
      header: "Whaddua gotta get done?",
      inputs: [
        {
          type: "text",
          name: "title"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Save",
          handler: data => {
            let newTodo = this.instantiateTodo(data.title);
            this.storageService.createTodo(newTodo).then(() => {
              this.getTodos();
            });
          }
        }
      ]
    });
    await alert.present().then(() => {
      this.getTodos();
    });
  }

  instantiateTodo(title: string): Todo {
    let newDate = new Date().toISOString();
    return {
      id: newDate,
      title: title,
      details: "",
      isCompleted: false,
      createdAt: newDate,
      completedAt: ""
    };
  }
}
