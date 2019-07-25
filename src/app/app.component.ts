import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";

import { StorageService } from "./services/storage.service";

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {

  constructor(private storageService: StorageService) {
    SplashScreen.hide().catch(err => {
      console.warn(err);
    });
    StatusBar.hide().catch(err => {
      console.warn(err);
    });

    this.storageService.getCategories().then(data => {
      if (!data) {
        this.storageService.initializeTodoCategories();
      }
    })
  }
}
