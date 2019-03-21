import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Router } from "@angular/router";

import { TodoService } from "../../services/todo.service";
import { Todo } from "../../interfaces/todo.interface";
import { CreateTodoPage } from '../../pages/create-todo/create-todo.page';
import { Subscription } from "rxjs";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.page.html",
  styleUrls: ["./todo.page.scss"]
})
export class TodoPage implements OnInit {
  grouped: boolean;
  groupedTodos: any;
  groupedTodosChangedSub: Subscription;

  todos: Todo[];
  todosChangedSub: Subscription;

  constructor(
    public todoService: TodoService,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.todoService.getTodos();
    this.todoService.getGroupedTodos();
    this.todoService.getTodoCategories();

    this.grouped = true;
    this.todosChangedSub = this.todoService.todosChanged$.subscribe(todos => this.todos = todos);
    this.groupedTodosChangedSub = this.todoService.groupedTodosChanged$.subscribe(groupedTodos => this.groupedTodos = groupedTodos);
  }

  ngOnDestroy(): void {
    if (this.todosChangedSub) {
      this.todosChangedSub.unsubscribe();
    }
    if (this.groupedTodosChangedSub) {
      this.groupedTodosChangedSub.unsubscribe();
    }
  }

  filterTodo(todo: Todo) {
    return !todo.isCompleted;
  }

  toggleCompleted(todo: Todo, ev: any) {
    ev.stopPropagation();
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(todo);
  }

  segmentChanged(ev: any) {
    this.grouped = ev.detail.value === 'all' ? false : true;
  }

  isEmpty(id: string) {
    if (!id || id === undefined || typeof id === 'undefined' || id === "undefined") {
      return true;
    }
    else {
      return false;
    }
  }

  routeToEdit(id: number) {
    this.router.navigateByUrl('/edit/' + id);
  }

  async presentCreateTodoModal() {
    const modal = await this.modalController.create({
      component: CreateTodoPage,
      componentProps: {}
    });
    return await modal.present();
  }

  goToSettings() {
    this.router.navigateByUrl('/settings');
  }

  setIconColor(color: string) {
    let style = {
      'color': color
    }
    return style;
  }

  getColorCode(id: string) {
    let returnVal = this.todoService.getTodoCategory(id);
    let style = {
      'color': returnVal.colorCode
    }
    return style;
  }

  getCategoryName(id: string) {
    let returnVal = this.todoService.getTodoCategory(id);
    return returnVal.name;
  }

}
