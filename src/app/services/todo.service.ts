import { Injectable } from "@angular/core";

import { Todo } from "../interfaces/todo.interface";
import { AlertController } from "@ionic/angular";

// import { groupBy } from 'lodash';

import * as _ from 'lodash';

import { StorageService } from "../services/storage.service";
import { TodoCategory } from "../interfaces/todo-category.interface";
import { BehaviorSubject, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  todos: Todo[];
  private todosSubject$ = new BehaviorSubject<Todo[]>(this.todos);
  todosChanged$ = this.todosSubject$.asObservable();

  todoCategories: TodoCategory[];
  private todoCategoriesSubject$ = new BehaviorSubject<TodoCategory[]>(this.todoCategories);
  todoCategoriesChanged$ = this.todoCategoriesSubject$.asObservable();

  groupedTodos: any;
  private groupedTodosSubject$ = new BehaviorSubject<any>(this.groupedTodos);
  groupedTodosChanged$ = this.groupedTodosSubject$.asObservable();

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
      this.todosSubject$.next(this.todos);
      this.getGroupedTodos();
    });
  }

  getTodoCategories() {
    this.storageService.getCategories().then(categories => {
      this.todoCategories = categories;
      this.todoCategoriesSubject$.next(this.todoCategories);
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
    this.groupedTodos = _.chain(this.todos)
      .filter(['isCompleted', false])
      .groupBy(x => x.categoryId)
      .map((value, key) => ({ categoryId: key, todos: value }))
      .value();
    this.groupedTodosSubject$.next(this.groupedTodos);
  };

  updateTodo(todo: Todo) {
    this.storageService.updateTodo(todo).then(todos => {
      this.todos = todos;
      this.todosSubject$.next(this.todos);
      this.getGroupedTodos();
    });
  }

  deleteTodo(id: string) {
    this.storageService.deleteTodo(id).then(todos => {
      this.todos = todos;
      this.todosSubject$.next(this.todos);
      this.getGroupedTodos();
    });
  }

  deleteCategory(id: string) {
    let parentThis = this;
    this.storageService.deleteCategory(id).then(() => {
      this.unassignTodosWithDeletedCategory(parentThis, id);
    });
    this.getTodos();
    this.getTodoCategories();
  }

  unassignTodosWithDeletedCategory(parentThis: any, id: string) {
    this.todos.forEach(function (todo) {
      if (todo.categoryId === id) {
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
    });
  }

  createTodo(newTodo: Todo): Observable<Todo[]> {
    this.storageService.createTodo(newTodo).then(updatedTodos => {
      this.todos = updatedTodos;
      this.todosSubject$.next(this.todos);
      this.getGroupedTodos();
    });
    return of(this.todos);
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
