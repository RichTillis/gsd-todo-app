import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";
import { Router, RouterEvent } from '@angular/router';

import { StorageService } from "./services/storage.service";

const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public appPages = [
    {
      title: 'Todo Listing',
      url: '/home',
      icon: 'checkmark-circle'
    },
    {
      title: 'Category Settings',
      url: '/categories',
      icon: 'list-box'
    },
    {
      title: 'Theme Settings',
      url: '/themes',
      icon: 'color-palette'
    },
  ];

  selectedPath = '';

  constructor(private router:Router, private storageService: StorageService) {
    this.router.events.subscribe((event: RouterEvent) => {
      if(event && event.url){
        this.selectedPath = event.url;
      }
    });
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
