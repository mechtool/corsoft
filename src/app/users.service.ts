import { Injectable } from '@angular/core';
import {catchError, map, Observable, of} from 'rxjs';
import {User} from './model';
import {HttpClient} from '@angular/common/http';

export enum API_URLS{
  BASE = 'https://jsonplaceholder.typicode.com/users',
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(public http: HttpClient) { }

  public delete(user: User){
    return this.http.delete<User[]>(`${API_URLS.BASE}/${user.id}`).pipe(catchError(err => {
      return of(err);
    }));
  }
  update(user: User){
    return this.http.put<User[]>(`${API_URLS.BASE}/${user.id}`, user).pipe(catchError(err => {
      return of(err);
    }));

  }
  detail(user: User){
    return this.http.get<User[]>(`${API_URLS.BASE}/${user.id}`).pipe(catchError(err => {
      return of(err);
    }));

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
}
