import {Injectable} from '@angular/core';
import {catchError, Observable, of} from 'rxjs';
import {User} from './model';
import {HttpClient} from '@angular/common/http';

export enum API_URLS{
  BASE = 'https://jsonplaceholder.typicode.com/users',
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  static users: User[] = [];
  constructor(public http: HttpClient) {}

  public delete(user: User){
    return this.http.delete<User[]>(`${API_URLS.BASE}/${user.id}`).pipe(catchError(err => {
      return of(err);
    }));
  }
  edit(user: User){
    return this.http.put<User[]>(`${API_URLS.BASE}/${user.id}`,user).pipe(catchError(err => {
      return of(err);
    }));

  }
  detail(user: User){
    return this.http.get<User[]>(`${API_URLS.BASE}/${user?.id}`).pipe(catchError(err => {
      return of(err);
    }));

  }
  findAndChange(newUser: User){
    var old = UsersService.users.find(user => user.id === newUser.id);
    if(old){
      UsersService.users = UsersService.users.map(user => {
      return user.id === newUser.id ? {...user, ...newUser} : user;
    })}
    else{
      UsersService.users = [...UsersService.users, newUser];
    }
  }
  public add(user: User){
    return this.http.post<User[]>(`${API_URLS.BASE}`, user).pipe(catchError(err => {
      return of(err);
    }));
  }

  public getAllUsers() :Observable<any[]>{
    return this.http.get<User[]>(API_URLS.BASE).pipe(catchError(err => {
      return of(err);
    }));
  }
  public createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}
