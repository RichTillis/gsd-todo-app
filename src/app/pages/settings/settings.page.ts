import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ModalController, AlertController } from "@ionic/angular";
import { TodoCategory } from '../../interfaces/todo-category.interface';

import { TodoCategoryCreatePage } from "../../pages/todo-category-create/todo-category-create.page";

import { TodoService } from '../../services/todo.service';
import { Subscription } from "rxjs";


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  public newTodoCategory: TodoCategory;
  todoCategories: TodoCategory[];
  todoCategoriesChangedSub: Subscription;

  constructor(private router: Router,
    public modalController: ModalController,
    public todoService: TodoService,
    private alertController: AlertController) { }

  ngOnInit() {
    this.todoService.getTodoCategories();
    this.todoCategoriesChangedSub = this.todoService.todoCategoriesChanged$.subscribe(todoCategories => this.todoCategories = todoCategories);
    this.initializeNewTodoCategory();
  }

  ngOnDestroy(): void {
    if (this.todoCategoriesChangedSub) {
      this.todoCategoriesChangedSub.unsubscribe();
    }
  }

  initializeNewTodoCategory() {
    this.newTodoCategory = {
      id: '',
      name: '',
      colorCode: ''
    }
  }

  goBack() {
    this.router.navigateByUrl('/home/todo');
  }

  setIconColor(color: string) {
    let style = {
      'font-size': '24px',
      'margin-right': '1em',
      'color': color
    }
    return style;
  }

  async presentTodoCategoryCreateModal(category: TodoCategory) {
    const modal = await this.modalController.create({
      component: TodoCategoryCreatePage,
      componentProps: { category: category }
    });
    this.initializeNewTodoCategory();
    return await modal.present();
  }

  deleteCategory(category: TodoCategory, ev: any) {
    ev.stopPropagation();
    this.presentDeleteConfirm(category);
  }

  async presentDeleteConfirm(category: TodoCategory) {
    const alert = await this.alertController.create({
      header: "Delete Category?",
      message: "You sure? Todos in the '" + category.name + "' category will be moved to the 'unassigned' category",
      buttons: [
        {
          text: "No",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Delete cancelled");
          }
        },
        {
          text: "Yes",
          handler: () => {
            console.log('delete me');
            this.todoService.deleteCategory(category.id);
          }
        }
      ]
    });

    await alert.present();
  }


}
