import { Component, OnInit } from "@angular/core";
import { ToastController, ModalController } from "@ionic/angular";
import { Router } from "@angular/router";

import { TodoService } from "../../services/todo.service";
import { Todo } from "../../interfaces/todo.interface";
import { TodoCategory } from "src/app/interfaces/todo-category.interface";

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.page.html',
  styleUrls: ['./create-todo.page.scss'],
})
export class CreateTodoPage implements OnInit {
  public todo: Todo;
  public selectedCategory: TodoCategory;

  constructor(private router: Router, private modalController: ModalController,
    private toastController: ToastController,
    public todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodoCategories();
    let newDate = new Date().getTime() / 1000;
    newDate = Math.floor(newDate);
    console.log(newDate);
    this.todo = {
      id: newDate.toString(),
      title: "",
      details: "",
      isCompleted: false,
      createdAt: newDate.toString(),
      completedAt: ""
    };
  }

  saveTodo() {
    if (this.selectedCategory) {
      this.todo.categoryId = this.selectedCategory.id;
      this.todo.categoryName = this.selectedCategory.name;
      this.todo.categoryColorCode = this.selectedCategory.colorCode;
    }

    this.todoService.createTodo(this.todo);
    this.saveSuccessfulToast();
    this.closeModal();
    // this.router.navigateByUrl('/tabs/todo');
  }

  async saveSuccessfulToast() {
    const toast = await this.toastController.create({
      message: "Todo saved.",
      duration: 2000,
      position: "bottom",
      color: "tertiary"
    });
    toast.present();
  }

  closeModal() {
    this.modalController.dismiss();
    // this.router.navigateByUrl('/tabs/todo');
  }

  goToSettings() {
    this.router.navigateByUrl('/settings');
  }

}
