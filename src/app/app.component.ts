import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";

import { StorageService } from "./services/storage.service";
import { TodoCategory } from "./interfaces/todo-category.interface";

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public menuItems = [
    { name: 'Home', route: '/home', icon: 'home' }
  ];

  constructor(private storageService: StorageService) {
    SplashScreen.hide().catch(err => {
      console.warn(err);
    });
    StatusBar.hide().catch(err => {
      console.warn(err);
    });

    this.storageService.getCategories().then(data => {
      if (!data) {
        // console.log('no data');
        this.storageService.initializeTodoCategories();
      }
    })
  }
}
