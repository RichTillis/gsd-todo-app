import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from "@ionic/angular";
import { TodoCategory } from 'src/app/interfaces/todo-category.interface';

import { StorageService } from '../../services/storage.service'
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-category-create',
  templateUrl: './todo-category-create.page.html',
  styleUrls: ['./todo-category-create.page.scss'],
})
export class TodoCategoryCreatePage implements OnInit {
  @Input() category: TodoCategory;

  constructor(private modalController: ModalController,
    public storageService: StorageService,
    public todoService: TodoService,
    public alertController: AlertController) { }

  ngOnInit() {
    console.log(this.category);
  }

  selectColor(colorName: string, colorCode: string) {
    this.category.colorName = colorName;
    this.category.colorCode = colorCode;
  }

  saveTodo() {
    if (this.isCategoryValid()) {
      if (this.category.id.length > 0) {
        this.storageService.updateTodoCategory(this.category).then(() => {
          this.todoService.getTodoCategories();
          this.modalController.dismiss();
        });
      }
      else {
        let newId = new Date().getTime().toString();
        this.category.id = newId;
        this.storageService.createTodoCategory(this.category).then(() => {
          this.todoService.getTodoCategories();
          this.modalController.dismiss();
        });
      }
    }
  }

  closeModal() {
    this.modalController.dismiss();
  }

  isCategoryValid() {
    if (this.category.name.length > 0 && this.category.colorName.length > 0) {
      return true;
    }
    else {
      this.presentInvalidDataAlert();
      return false;
    }
  }

  async presentInvalidDataAlert() {
    const alert = await this.alertController.create({
      header: 'Oops',
      message: 'The category needs a name and a color',
      buttons: ['Got it']
    });

    await alert.present();
  }

}
