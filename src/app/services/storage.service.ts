import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import { Todo } from "../interfaces/todo.interface";

const TODO_KEY = "my-todos";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor(private storage: Storage) {}

  async createTodo(newTodo: Todo) {
    const todos = await this.storage.get(TODO_KEY);
    if (todos) {
      todos.push(newTodo);
      return this.storage.set(TODO_KEY, todos);
    } else {
      return this.storage.set(TODO_KEY, [newTodo]);
    }
  }

  getTodos(): Promise<Todo[]> {
    return this.storage.get(TODO_KEY);
  }

  async updateTodo(todo: Todo) {
    const todos = await this.storage.get(TODO_KEY);
    if (!todos || todos.length === 0) {
      return null;
    }

    let newTodos: Todo[] = [];
    for (let i of todos) {
      if (i.id === todo.id) {
        newTodos.push(todo);
      } else {
        newTodos.push(i);
      }
    }
    return this.storage.set(TODO_KEY, newTodos);
  }

  async deleteTodo(id: string) {
    const todos = await this.storage.get(TODO_KEY);
    if (!todos || todos.length === 0) {
      return null;
    }
    let toKeep: Todo[] = [];
    for (let i of todos) {
      if (i.id !== id) {
        toKeep.push(i);
      }
    }
    return this.storage.set(TODO_KEY, toKeep);
  }

  getTodo(id: string): Promise<any> {
    console.log(id);
    return this.storage.get(TODO_KEY).then((todos: Todo[]) => {
      console.log(todos);
      if (!todos || todos.length === 0) {
        return null;
      }
      let returnTodo: Todo;
      for (let i of todos) {
        if (i.id === id) {
          returnTodo = i;
          break;
        }
      }console.log(returnTodo)
      return returnTodo;
    });
  }
}
