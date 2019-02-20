import { Component } from "@angular/core";
import { Plugins } from "@capacitor/core";
const { SplashScreen, StatusBar } = Plugins;

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  public menuItems = [
    {name:'Home', route:'/home', icon:'home'}
  ];

  constructor() {
    SplashScreen.hide().catch(err => {
      console.warn(err);
    });
    StatusBar.hide().catch(err => {
      console.warn(err);
    });
  }
}
