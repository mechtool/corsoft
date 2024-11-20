import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";
import {SplitButtonModule} from "primeng/splitbutton";
import {ToolbarModule} from "primeng/toolbar";
import {DataViewModule} from 'primeng/dataview';
import {TagModule} from 'primeng/tag';
import {CommonModule, NgClass} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../model';
import {catchError, Observable, take, tap} from 'rxjs';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {ConfirmationService, Message, MessageService} from 'primeng/api';
import {MessageModule} from 'primeng/message';
import {PaginatorModule} from 'primeng/paginator';
import {UsersService} from '../users.service';
import { MessagesModule} from 'primeng/messages';
import {ChipsModule} from 'primeng/chips';
import {Ripple} from 'primeng/ripple';
import {ToggleButtonModule} from 'primeng/togglebutton';


@Component({
  selector: 'app-users-list-component',
  standalone: true,
  imports: [
    CommonModule,
    Button,
    InputTextareaModule,
    SplitButtonModule,
    ToolbarModule,
    DataViewModule,
    TagModule,
    NgClass,
    TableModule,
    ToastModule,
    MessageModule,
    ConfirmDialogModule,
    PaginatorModule,
    DialogModule,
    MessagesModule,
    ChipsModule,
    Ripple,
    ToggleButtonModule
  ],
  providers: [ MessageService, ConfirmationService,  UsersService ] ,
  templateUrl: './users-list-component.component.html',
  styleUrl: './users-list-component.component.scss'
})
export class UsersListComponentComponent {
  userAddDialog: boolean = false;
  user!: User;
  selectedUsers!: User[] | null;
  submitted: boolean = false;
  editing = false;
  rowEditMode = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    public usersService : UsersService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    (this.activatedRoute?.data as Observable<{usersData : User[]}>).pipe(
      take(1),
      tap(res => {
        UsersService.users = res.usersData;
    })).subscribe();
  }

  addUser() {
    this.router.navigate(['user-create'])
  }
  onRowEditInit(event: Event, user: User) {
    event.stopImmediatePropagation();
    this.editing = true;
  }

  onRowEditSave(event: Event, user: User) {
    event.stopImmediatePropagation();
    this.editing = false

  }

  onRowEditCancel(event: Event, user: User) {
    event.stopImmediatePropagation();
    this.editing = false

  }

  deleteSelected() {
    this.confirmationService.confirm({
      message: 'Удалить выбранного пользователя?',
      header: 'Подтверждение.',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedUsers?.length && this.usersService.delete(this.selectedUsers[0]).pipe(
          take(1),
          tap(res => {
            UsersService.users = UsersService.users.filter((user: User) => {
            return user.id !== this.selectedUsers?.[0].id
          });
          this.selectedUsers = null;
          this.messageService.add({ severity: 'success', summary: 'Выполнено!', detail: 'Удаление элементов', life: 2000 });
        }),
          catchError(err => {
            this.messageService.add({ severity: 'error', summary: 'Ошибка!', detail: err.message, life: 2000 });
            return err;
          })).subscribe();
      }
    });
  }

  editSelected() {
    const user = this.selectedUsers?.[0]
    this.router.navigate(['user-edit', user?.id], {state: {user}})
  }

  hideDialog() {
    this.userAddDialog = false;
    this.submitted = false;
  }
  openUserDetails(event : Event, user: User){
    if((event?.currentTarget as HTMLElement)?.localName === 'tr') this.router.navigate(['user-detail', user.id], {state: {user}});
    else event.stopImmediatePropagation();
  }

  protected readonly UsersService = UsersService;
}
