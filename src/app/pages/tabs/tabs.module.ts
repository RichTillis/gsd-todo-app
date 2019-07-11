import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";
import { FormsModule } from "@angular/forms";

import { TabsPage } from "./tabs.page";

import { TabsPageRoutingModule } from "./tabs.routing.module";
import { TodoPageModule } from "./todo/todo.module";
import { CompletedPageModule } from "./completed/completed.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    TodoPageModule,
    CompletedPageModule
  ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
