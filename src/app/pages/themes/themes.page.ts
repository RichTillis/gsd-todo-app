import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.page.html',
  styleUrls: ['./themes.page.scss'],
})
export class ThemesPage implements OnInit {

  constructor(private themeService: ThemeService) { }

  ngOnInit() {
  }

  enableIonicTheme(){
    this.themeService.enableTheme('ionic-theme');
  }

  enableOriginalTheme(){
    this.themeService.enableLight();
  }


}
