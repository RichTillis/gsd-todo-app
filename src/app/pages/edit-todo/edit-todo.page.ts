import { Component, OnInit } from "@angular/core";
import { ToastController } from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";

import { Todo } from "../../interfaces/todo.interface";
import { TodoService } from "../../services/todo.service";
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

    //TODO - is this really needed anymore???
    let newDate = new Date().getTime() / 1000
    newDate = Math.floor(newDate);
    this.todo = {
      id: newDate.toString(),
      title: "",
      details: "",
      isCompleted: false,
      createdAt: newDate.toString(),
      completedAt: ""
    };
  }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    if (id != null) {
      this.todoService.getTodo(id).then(todo => {
        this.todo = todo;
        this.selectedCategory = this.todoService.getTodoCategory(this.todo.categoryId);
      });
    }
  }

  saveTodo() {
    if (this.selectedCategory) {
      this.todo.categoryId = this.selectedCategory.id;
      this.todo.categoryName = this.selectedCategory.name;
      this.todo.categoryColorCode = this.selectedCategory.colorCode;
    }
    //this should be a promise
    this.todoService.updateTodo(this.todo);
    //then the successful toast and redirect
    this.saveSuccessfulToast();
    this.router.navigateByUrl('/home/tabs/todo');
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
