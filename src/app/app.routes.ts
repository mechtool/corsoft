import { Routes } from '@angular/router';
import {UsersListComponentComponent} from './users-list-component/users-list-component.component';
import {UserDetailsComponentComponent} from './user-details-component/user-details-component.component';
import {UserFormComponentComponent} from './user-form-component/user-form-component.component';
import {UsersResolver} from './services/user-data-resolver/user-data.resolver';

export const routes: Routes = [
  {path: '', redirectTo: 'users-list', pathMatch: 'full' },
  {path: 'users-list', component: UsersListComponentComponent, resolve: {usersData: UsersResolver} },
  {
    path: 'user-create/:id',
    data: { title: 'Добавление пользователя' },
    loadComponent: () => import('./user-form-component/user-form-component.component').then(c => c.UserFormComponentComponent)},
  {path: 'user-detail/:id',  component: UserDetailsComponentComponent},
  {path: 'user-edit/:id', data: { title: 'Редактирование пользователя' },component: UserFormComponentComponent},
];
