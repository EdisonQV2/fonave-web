import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'transparency',
    loadComponent: () => import('./features/transparency/transparency.component').then(m => m.TransparencyComponent)
  },
  {
    path: 'policies',
    loadComponent: () => import('./features/policies/policies.component').then(m => m.PoliciesComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

