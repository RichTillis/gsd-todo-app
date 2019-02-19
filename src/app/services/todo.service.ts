import { Injectable } from "@angular/core";

import { Todo } from "../interfaces/todo.interface";
import { AlertController } from "@ionic/angular";

// import { groupBy } from 'lodash';

import * as _ from 'lodash';

import { StorageService } from "../services/storage.service";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  public todos: Todo[];
  public groupedTodos: any;

  constructor(
    private storageService: StorageService,
    public alertController: AlertController
  ) { }

  getTodo(id: string): Promise<any> {
    return this.storageService.getTodo(id);
  }

  getTodos() {
    this.storageService.getTodos().then(todos => {
      this.todos = todos;
      console.log(this.todos);
    });
  }

  getGroupedTodos() {
    this.storageService.getTodos().then(todos => {
      this.groupedTodos = _.chain(todos)
        .filter(['isCompleted', false])
        .groupBy(x => x.group)
        .map((value, key) => ({ group: key, todos: value }))
        .value();
      console.log(this.groupedTodos);
    });
  }

  updateTodo(todo: Todo) {
    this.storageService.updateTodo(todo).then(() => {
      this.getTodos();
      this.getGroupedTodos();
    });
  }

  deleteTodo(id: string) {
    this.storageService.deleteTodo(id).then(() => {
      this.getTodos();
      this.getGroupedTodos();
    });
  }

  createTodo(newTodo: Todo): void {
    // this.presentCreateTodoPrompt().then(() => {
    //   this.getTodos();
    // });
    this.storageService.createTodo(newTodo).then(() => {
      this.getTodos();
      this.getGroupedTodos();
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
      this.getGroupedTodos();
    });
  }

  instantiateTodo(title: string): Todo {
    let newDate = new Date().toISOString();
    return {
      id: newDate,
      title: title,
      group: "",
      details: "",
      isCompleted: false,
      createdAt: newDate,
      completedAt: ""
    };
  }
}
