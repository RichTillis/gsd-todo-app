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
    public storageService: StorageService,
    public alertController: AlertController
  ) { }

  getTodo(id: string): Promise<any> {
    return this.storageService.getTodo(id);
  }

  getTodos() {
    this.storageService.getTodos().then(todos => {
      this.todos = todos;
      this.getGroupedTodos();
      // console.log(this.todos);
    });
  }

  getTodoCategories() {
    this.storageService.getCategories().then(categories => {
      this.todoCategories = categories;
      // console.log(this.todoCategories);
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
      // console.log(this.groupedTodos);
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

  deleteCategory(id: string) {
    // console.log('deleting id: ', id);
    let parentThis = this;
    this.storageService.deleteCategory(id).then(() => {
      this.unassignTodosWithDeletedCategory(parentThis, id)
      this.getTodoCategories();
    });
  }

  unassignTodosWithDeletedCategory(parentThis: any, id: string): any {
    this.todos.forEach(function (todo) {
      if (todo.categoryId === id) {
        // console.log('found one', todo);
        let newTodo: Todo = {
          completedAt: todo.completedAt,
          createdAt: todo.createdAt,
          details: todo.details,
          id: todo.id,
          isCompleted: todo.isCompleted,
          title: todo.title
        }

        parentThis.updateTodo(newTodo);
      }
    })
    return 0;
  }

  createTodo(newTodo: Todo): void {
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
