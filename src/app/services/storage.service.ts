import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";

import { Todo } from "../interfaces/todo.interface";
import { TodoCategory } from "../interfaces/todo-category.interface";

const TODO_KEY = "my-todos";
const CAT_KEY = "my-categories";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor(private storage: Storage) { }

  async createTodo(newTodo: Todo) {
    const todos = await this.storage.get(TODO_KEY);
    if (todos) {
      todos.push(newTodo);
      return this.storage.set(TODO_KEY, todos);
    } else {
      return this.storage.set(TODO_KEY, [newTodo]);
    }
  }

  async createTodoCategory(newCategory: TodoCategory) {
    const categories = await this.storage.get(CAT_KEY);
    if (categories) {
      categories.push(newCategory);
      return this.storage.set(CAT_KEY, categories);
    } else {
      return this.storage.set(CAT_KEY, [newCategory]);
    }
  }

  async initializeTodoCategories() {
    let firstCat: TodoCategory = {
      id: '1',
      name: 'School',
      colorCode: '#808080'
    }
    let secondCat: TodoCategory = {
      id: '2',
      name: 'Work',
      colorCode: '#000000'
    }
    let thirdCat: TodoCategory = {
      id: '3',
      name: 'Today',
      colorCode: '#811a74'
    }
    this.storage.set(CAT_KEY, [firstCat, secondCat, thirdCat]);
  }

  getTodos(): Promise<Todo[]> {
    return this.storage.get(TODO_KEY);
  }

  getCategories(): Promise<TodoCategory[]> {
    return this.storage.get(CAT_KEY);
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

  async updateTodoCategory(todoCategory: TodoCategory) {
    const categories = await this.storage.get(CAT_KEY);
    if (!categories || categories.length === 0) {
      return null;
    }

    let newCategories: TodoCategory[] = [];
    for (let i of categories) {
      if (i.id === todoCategory.id) {
        newCategories.push(todoCategory);
      } else {
        newCategories.push(i);
      }
    }
    return this.storage.set(CAT_KEY, newCategories);
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

  async deleteCategory(id: string) {
    const categories = await this.storage.get(CAT_KEY);
    if (!categories || categories.length === 0) {
      return null;
    }
    let toKeep: TodoCategory[] = [];
    for (let i of categories) {
      if (i.id !== id) {
        toKeep.push(i);
      }
    }
    return this.storage.set(CAT_KEY, toKeep);
  }

  getTodo(id: string): Promise<any> {
    // console.log(id);
    return this.storage.get(TODO_KEY).then((todos: Todo[]) => {
      // console.log(todos);
      if (!todos || todos.length === 0) {
        return null;
      }
      let returnTodo: Todo;
      for (let i of todos) {
        if (i.id === id) {
          returnTodo = i;
          break;
        }
      }
      // console.log(returnTodo)
      return returnTodo;
    });
  }
}
