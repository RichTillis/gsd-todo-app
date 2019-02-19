import { Component, OnInit } from "@angular/core";
import { ModalController, AlertController } from "@ionic/angular";
import { Router } from "@angular/router";

import { CreateTodoPage } from "../../create-todo/create-todo.page";

import { TodoService } from "../../services/todo.service";
import { Todo } from "../../interfaces/todo.interface";

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
    private modalCtrl: ModalController,
    public alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    this.todoService.getTodos();
    this.todoService.getGroupedTodos();
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
    console.log("Segment changed", ev.detail.value);
    if (ev.detail.value === 'all') {
      this.grouped = false;
    }
    else {
      this.grouped = true;
    }
  }

  isEmptyGroup(group: string) {
    if (group.trim().length === 0 || group === "undefined") {
      return true;
    }
    else {
      return false;
    }
  }

  createTodo(): void {
    this.modalCtrl
      .create({
        component: CreateTodoPage
      })
      .then(modal => {
        // modal.onDidDismiss().then(() => {});
        modal.present();
      });
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
            console.log(data);
            let newDate = new Date().toUTCString();

            this.todo = {
              id: newDate,
              title: data.title,
              group: data.group,
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
}
