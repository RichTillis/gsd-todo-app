import { Injectable } from "@angular/core";

import { Todo } from "../interfaces/todo.interface";
import { AlertController } from "@ionic/angular";

// import { groupBy } from 'lodash';

import * as _ from 'lodash';

import { StorageService } from "../services/storage.service";
import { TodoCategory } from "../interfaces/todo-category.interface";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  public todos: Todo[];
  public groupedTodos: any;
  public todoCategories: TodoCategory[];

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

  getTodoCategories() {
    this.storageService.getCategories().then(categories => {
      this.todoCategories = categories;
      console.log(this.todoCategories);
    });
  }

  getTodoCategory(todoCategoryId: string): TodoCategory {
    let todoCat: any;

    todoCat = _.filter(this.todoCategories, function (category) {
      return category.id === todoCategoryId;
    });

    return todoCat[0];
  }

  getGroupedTodos() {
    this.storageService.getTodos().then(todos => {
      this.groupedTodos = _.chain(todos)
        .filter(['isCompleted', false])
        .groupBy(x => x.categoryId)
        .map((value, key) => ({ categoryId: key, todos: value }))
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

  deleteCategory(id: string) {
    this.storageService.deleteCategory(id).then(() => {
      this.getTodos();
      this.getTodoCategories();
      this.getGroupedTodos();
    });
  }

  createTodo(newTodo: Todo): void {
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
    let newDate = new Date().getTime().toString();
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
