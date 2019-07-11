import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { AppPipesModule } from "../../../pipes/pipes.module";


import { CompletedPage } from "./completed.page";

const routes: Routes = [
  {
    path: "",
    component: CompletedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppPipesModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CompletedPage],
  entryComponents: []
})
export class CompletedPageModule {}
