import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '', loadChildren: './home/home.module#HomePageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'edit', loadChildren: './edit-todo/edit-todo.module#EditTodoPageModule' },
  { path: 'edit/:id', loadChildren: './edit-todo/edit-todo.module#EditTodoPageModule' },
  { path: 'create-todo', loadChildren: './create-todo/create-todo.module#CreateTodoPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
