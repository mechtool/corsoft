import {Component, OnInit} from '@angular/core';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {CardModule} from 'primeng/card';
import {DividerModule} from 'primeng/divider';
import {MessageService} from 'primeng/api';
import {PanelModule} from 'primeng/panel';
import {Button} from 'primeng/button';
import {Router, RouterLink} from '@angular/router';
import {NgForOf} from '@angular/common';
import {User} from '../model';
import {UsersService} from '../users.service';
import {take, tap} from 'rxjs';
@Component({
  selector: 'app-user-details-component',
  standalone: true,
  imports: [
    ToastModule,
    ToolbarModule,
    CardModule,
    DividerModule,
    PanelModule,
    Button,
    RouterLink,
    NgForOf
  ],
  providers: [MessageService, UsersService],
  templateUrl: './user-details-component.component.html',
  styleUrl: './user-details-component.component.scss'
})
export class UserDetailsComponentComponent implements OnInit{
  public user: any;
  constructor(private router: Router, private usersService: UsersService) {
    this.usersService.detail((this.router.getCurrentNavigation()?.extras?.state as {user: User})?.user as User).pipe(
      take(1),
      tap((res => {
        this.user = res;
      }))).subscribe();
  }

  ngOnInit() {
  }

  getUser(){
    const fields = ['name', 'phone', 'username','wedsite','email']; //address
    return Object.entries(this.user || {}).filter(item => {
      return fields.some(field => field === item[0])
    });
  }
}
