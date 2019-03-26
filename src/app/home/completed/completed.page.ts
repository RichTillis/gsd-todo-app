import { Component, OnInit } from "@angular/core";
import { AlertController, ModalController } from "@ionic/angular";
import { Router } from "@angular/router";

// import { CreateTodoPage } from '../../pages/create-todo/create-todo.page';

import { Todo } from "../../interfaces/todo.interface";
import { TodoService } from "../../services/todo.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-completed",
  templateUrl: "./completed.page.html",
  styleUrls: ["./completed.page.scss"]
})
export class CompletedPage implements OnInit {
  todos: Todo[];
  todosChangedSub: Subscription;

  constructor(
    public alertController: AlertController,
    public todoService: TodoService,
    private router: Router,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    this.todoService.getTodos();
    this.todosChangedSub = this.todoService.todosChanged$.subscribe(todos => this.todos = todos);
  }

  ngOnDestroy(): void {
    if (this.todosChangedSub) {
      this.todosChangedSub.unsubscribe();
    }
  }

  filterTodo(todo: Todo) {
    return todo.isCompleted;
  }

  toggleCompleted(todo: Todo, ev: any) {
    ev.stopPropagation();
    todo.isCompleted = !todo.isCompleted;
    this.todoService.updateTodo(todo);
  }

  routeToEdit(id: number) {
    this.router.navigateByUrl('/edit/' + id);
  }

  // async presentCreateTodoModal() {
  //   const modal = await this.modalController.create({
  //     component: CreateTodoPage,
  //     componentProps: {}
  //   });
  //   return await modal.present();
  // }

  async presentCreateCompletedTodoAlert() {
    const alert = await this.alertController.create({
      header: 'Quick Win!',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'What did you get done?'
        },
        {
          name: 'details',
          type: 'text',
          placeholder: 'Any interesting details?'
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
          text: 'Save',
          handler: (input) => {
            this.todoService.createQuickWinTodo(input);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteTodo(todo: Todo, ev: any) {
    ev.stopPropagation();
    this.presentDeleteConfirm(todo);
  }

  async presentDeleteConfirm(todo: Todo) {
    const alert = await this.alertController.create({
      header: "Delete Todo",
      message: "Are you sure?",
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
            this.todoService.deleteTodo(todo.id);
          }
        }
      ]
    });

    await alert.present();
  }

  goToSettings() {
    this.router.navigateByUrl('/settings');
  }
}
