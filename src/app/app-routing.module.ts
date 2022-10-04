import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { constantsRoutes } from './core/constants/routing.constants';
import { constantsTitles } from './core/constants/titles.constants';

const routes: Routes = [
  {
    path: constantsRoutes.home,
    data: { title: constantsTitles.home },
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: constantsRoutes.home,
    redirectTo: '',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
