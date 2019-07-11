import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // { path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  // { path: 'tabs', loadChildren: './pages/tabs/tabs.module#TabsPageModule' },
  // { path: 'edit', loadChildren: './pages/edit-todo/edit-todo.module#EditTodoPageModule' },
  // { path: 'edit/:id', loadChildren: './pages/edit-todo/edit-todo.module#EditTodoPageModule' },
  // { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  // { path: 'create-todo', loadChildren: './pages/create-todo/create-todo.module#CreateTodoPageModule' },
  { path: 'menu', loadChildren: './pages/menu/menu.module#MenuPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
