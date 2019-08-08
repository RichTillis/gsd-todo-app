import { Injectable, RendererFactory2, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  renderer: Renderer2;
  private themeSelected:string;

  constructor(private rendererFactory: RendererFactory2, @Inject(DOCUMENT) private document: Document) {
    this.renderer = this.rendererFactory.createRenderer(null,null);
   }

  enableTheme(themeSelected:string){
    this.themeSelected = themeSelected;
    this.renderer.addClass(this.document.body, this.themeSelected);
  }

  enableLight(){
    this.renderer.removeClass(this.document.body, this.themeSelected);
  }
}
