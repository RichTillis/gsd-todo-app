import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";

import { Todo } from "../interfaces/todo.interface";
import { TodoService } from "../services/todo.service";
import { TodoCategory } from "src/app/interfaces/todo-category.interface";

@Component({
  selector: "app-edit-todo",
  templateUrl: "./edit-todo.page.html",
  styleUrls: ["./edit-todo.page.scss"]
})
export class EditTodoPage implements OnInit {
  public todo: Todo;
  public selectedCategory: TodoCategory;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastController: ToastController,
    public todoService: TodoService
  ) {
    todoService.getTodoCategories();
    let newDate = new Date().getTime().toString();
    this.todo = {
      id: newDate,
      title: "",
      details: "",
      isCompleted: false,
      createdAt: newDate,
      completedAt: ""
    };
  }

  ngOnInit() {
    // console.log(this.route.snapshot);
    let id = this.route.snapshot.paramMap.get("id");
    if (id != null) {
      this.todoService.getTodo(id).then(todo => {
        this.todo = todo;
        this.selectedCategory = this.todoService.getTodoCategory(this.todo.categoryId);
        console.log(this.selectedCategory)
      });
    }
  }

  saveTodo() {
    if (this.selectedCategory) {
      this.todo.categoryId = this.selectedCategory.id;
      this.todo.categoryName = this.selectedCategory.name;
      this.todo.categoryColorName = this.selectedCategory.colorName;
      this.todo.categoryColorCode = this.selectedCategory.colorCode;
    }
    console.log(this.todo);
    //this should be a promise
    this.todoService.updateTodo(this.todo);
    //then the successful toast and redirect
    this.saveSuccessfulToast();
    this.router.navigateByUrl('/home/todo');
  }

  goBack() {
    this.router.navigateByUrl('/home/todo');
  }

  goToSettings() {
    this.router.navigateByUrl('/settings');
  }

  async saveSuccessfulToast() {
    const toast = await this.toastController.create({
      message: "Changes saved.",
      duration: 2000,
      position: "bottom",
      color: "tertiary"
    });
    toast.present();
  }
}
