import { Component, OnInit } from "@angular/core";
import { AlertController} from "@ionic/angular";
import { Router } from "@angular/router";

import { Todo } from "../../../interfaces/todo.interface";
import { TodoService } from "../../../services/todo.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-completed",
  templateUrl: "./completed.page.html",
  styleUrls: ["./completed.page.scss"]
})
export class CompletedPage implements OnInit {
  todos: Todo[];
  todosChangedSub: Subscription;
  completedTodosGrouped: Todo[];
  completedTodosGroupedSub: Subscription;
  grouped: boolean;

  constructor(
    public alertController: AlertController,
    public todoService: TodoService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.grouped = true;

    this.todoService.getTodos();
    this.todosChangedSub = this.todoService.todosChanged$.subscribe(todos => this.todos = todos);
    this.completedTodosGroupedSub = this.todoService.groupedCompletedTodosChanged$.subscribe(completedTodos => this.completedTodosGrouped = completedTodos);
  }

  ngOnDestroy(): void {
    if (this.todosChangedSub) {
      this.todosChangedSub.unsubscribe();
      this.completedTodosGroupedSub.unsubscribe();
    }
  }

  filterTodo(todo: Todo) {
    return todo.isCompleted;
  }

  toggleCompleted(todo: Todo, ev: any) {
    ev.stopPropagation();
    this.todoService.toggleCompleted(todo);
  }

  routeToEdit(id: number) {//TODO: should be a string?
    this.router.navigateByUrl('/edit/' + id);
  }

  segmentChanged(ev: any) {
    this.grouped = ev.detail.value === 'all' ? false : true;
  }

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
