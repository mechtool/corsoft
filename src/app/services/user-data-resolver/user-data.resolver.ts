import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {UsersService} from '../../users.service';
import {Observable, tap} from 'rxjs';
import {User} from '../../model';

@Injectable({providedIn: "root"})
export class UsersResolver implements Resolve<Observable<User[]>> {
  constructor(private usersService: UsersService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User[]> {
    return this.usersService.getAllUsers();
  }
}
