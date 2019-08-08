import { NgModule } from '@angular/core';
import { PreloadAllModules, Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home/tabs/todo', pathMatch: 'full' },
  { 
    path: 'home', 
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule) 
  },
  {
    path: 'categories',
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesPageModule)
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./pages/edit-todo/edit-todo.module').then(m => m.EditTodoPageModule)
  },
  { 
    path: 'themes', 
    loadChildren: () => import('./pages/themes/themes.module').then(m => m.ThemesPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
