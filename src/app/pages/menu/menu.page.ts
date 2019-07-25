import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  pages = [
    {
      title: 'Todo Listing',
      url: '/menu/home'
    },
    {
      title: 'Category Settings',
      url: '/menu/categories'
    }
  ];

  selectedPath = '';

  constructor(private router:Router) { 
    this.router.events.subscribe((event: RouterEvent) => {
      if(event && event.url){
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {
  }

}
