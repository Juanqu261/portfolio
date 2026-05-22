import { Routes } from '@angular/router';
import { langGuard } from './core/guards/lang.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'en' },
  {
    path: ':lang',
    canActivate: [langGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'projects/:id',
        loadComponent: () =>
          import('./features/projects/project-detail.component').then(
            (m) => m.ProjectDetailComponent,
          ),
      },
      { path: '**', redirectTo: '' },
    ],
  },
  { path: '**', redirectTo: 'en' },
];
