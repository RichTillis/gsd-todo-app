import { Injectable } from "@angular/core";

import { Todo } from "../interfaces/todo.interface";
import { AlertController } from "@ionic/angular";

// import { groupBy } from 'lodash';

import * as _ from 'lodash';
import * as moment from 'moment';

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

  priorityTodos: Todo[];
  private priorityTodosSubject$ = new BehaviorSubject<Todo[]>(this.priorityTodos);
  priorityTodosChanged$ = this.priorityTodosSubject$.asObservable();

  completedTodos: Todo[];
  private completedTodosSubject$ = new BehaviorSubject<Todo[]>(this.completedTodos);
  completedTodosChanged$ = this.completedTodosSubject$.asObservable();

  groupedCompletedTodos: any;
  private groupedCompletedTodosSubject$ = new BehaviorSubject<Todo[]>(this.groupedCompletedTodos);
  groupedCompletedTodosChanged$ = this.groupedCompletedTodosSubject$.asObservable();

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
      this.getPriorityTodos();
      this.getGroupedCompletedTodos();
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
    let todos = _.filter(this.todos, function (todo) {
      return !todo.isCompleted && !todo.isPriority;
    })
    this.groupedTodos = _.chain(todos)
      .groupBy(x => x.categoryId)
      .map((value, key) => ({ categoryId: key, todos: value }))
      .value();
    this.groupedTodosSubject$.next(this.groupedTodos);
  };

  getGroupedCompletedTodos() {
    let todos = _.filter(this.todos, function (todo) {
      return todo.isCompleted;
    });
    this.todos = this.todos.map((todo: Todo) => {
      todo.completedMonth = moment.unix(parseInt(todo.completedAt)).utc().format('MMMM');
      return todo;
    });
    console.log(this.todos);

    this.groupedCompletedTodos = _.chain(todos)
      .groupBy(x => x.completedMonth)
      .map((value, key) => ({ completedMonth: key, todos: value }))
      .value();
      console.log(this.groupedCompletedTodos);
    this.groupedCompletedTodosSubject$.next(this.groupedCompletedTodos);
  }

  // testCompleted() {
  //   this.groupedCompletedTodos = _.filter(this.todos, function (todo) {
  //     return todo.isCompleted;
  //   });
  //   this.groupedCompletedTodos = this.groupedCompletedTodos.map((completedTodo: Todo) => {
  //     completedTodo.completedAt = moment(completedTodo.completedAt).format('MMMM')
  //     return completedTodo;
  //   });
  //   console.log(this.groupedCompletedTodos);
  // }

  getPriorityTodos() {
    //TODO - regular javascript filter not lodash???
    this.priorityTodos = _.filter(this.todos, function (todo) {
      return !todo.isCompleted && todo.isPriority;
    })
    this.priorityTodosSubject$.next(this.priorityTodos);
  };

  getCompletedTodos() {
    this.completedTodos = _.chain(this.todos)
      .filter(['isCompleted', true])
      .value();
    this.completedTodosSubject$.next(this.completedTodos);
  };

  updateTodo(todo: Todo) {
    this.storageService.updateTodo(todo).then(todos => {
      this.todos = todos;
      this.todosSubject$.next(this.todos);
      this.getGroupedTodos();
      this.getPriorityTodos();
      this.getCompletedTodos();
    });
  }

  deleteTodo(id: string) {
    this.storageService.deleteTodo(id).then(todos => {
      this.todos = todos;
      this.todosSubject$.next(this.todos);
      this.getGroupedTodos();
      this.getPriorityTodos();
      this.getCompletedTodos();
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
      this.getPriorityTodos();
      this.getCompletedTodos();
    });
    return of(this.todos);
  }

  createQuickWinTodo(newQuickWinData: any) {
    let date = new Date().getTime() / 1000;
    date = Math.floor(date);
    let newDate = date.toString();
    let newTodo: Todo = this.instantiateTodo(newQuickWinData.title);
    newTodo.details = newQuickWinData.details;
    newTodo.isCompleted = true;
    newTodo.completedAt = newDate;
    this.createTodo(newTodo);
  }

  instantiateTodo(title: string): Todo {
    let date = new Date().getTime() / 1000;
    date = Math.floor(date);
    let newDate = date.toString();
    return {
      id: newDate,
      title: title,
      details: "",
      isCompleted: false,
      isPriority: false,
      createdAt: newDate,
      completedAt: ""
    };
  }

  toggleCompleted(todo: Todo) {
    if (todo.isCompleted) {
      todo.isCompleted = !todo.isCompleted;
      todo.completedAt = '';
      todo.completedMonth = '';
    }
    else {
      let completedDate = new Date().getTime() / 1000;
      completedDate = Math.floor(completedDate);
      console.log(completedDate);

      // let completedDate = new Date();
      todo.isCompleted = !todo.isCompleted;
      todo.completedAt = completedDate.toString();
    }
    this.updateTodo(todo);
  }
}
