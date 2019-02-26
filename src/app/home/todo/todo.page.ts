import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { Router } from "@angular/router";

import { TodoService } from "../../services/todo.service";
import { Todo } from "../../interfaces/todo.interface";
import { CreateTodoPage } from '../../pages/create-todo/create-todo.page';

@Component({
  selector: "app-todo",
  templateUrl: "./todo.page.html",
  styleUrls: ["./todo.page.scss"]
})
export class TodoPage implements OnInit {
  private todo: Todo;
  public grouped: boolean;

  constructor(
    public todoService: TodoService,
    public alertController: AlertController,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.todoService.getTodos();
    this.todoService.getGroupedTodos();
    this.todoService.getTodoCategories();
    this.grouped = false;
    // console.log(this.todoService.todos);
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
    // console.log("Segment changed", ev.detail.value);
    if (ev.detail.value === 'all') {
      this.grouped = false;
    }
    else {
      this.grouped = true;
    }
  }

  isEmpty(id: string) {
    if (!id || id === "undefined") {
      return true;
    }
    else {
      return false;
    }
  }

  routeToEdit(id: number) {
    this.router.navigateByUrl('/edit/' + id);
  }


  async presentCreateTodoPrompt() {
    const alert = await this.alertController.create({
      header: 'New Todo',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'Whaddua gotta get done?'
        },
        {
          name: 'group',
          type: 'text',
          placeholder: 'Category'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            let newDate = new Date().getTime().toString();

            this.todo = {
              id: newDate,
              title: data.title,
              details: "",
              isCompleted: false,
              createdAt: newDate,
              completedAt: ""
            };
            this.todoService.createTodo(this.todo);
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
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
    if (!color) {
      color = 'transparent';
    }
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
