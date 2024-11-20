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
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {UsersService} from '../users.service';
import {Messages, MessagesModule} from 'primeng/messages';
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

  public users: User[]  = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private usersService : UsersService,
    private router: Router,
    private confirmationService: ConfirmationService) {
    (this.activatedRoute?.data as Observable<{usersData : User[]}>).pipe(
      take(1),
      tap(res => {
      this.users = res.usersData;
    })).subscribe();
  }

  addUser() {
    const id = this.createId();
    this.router.navigate(['user-create', id], {state: {id}})
  }
  onRowEditInit(user: User) {
    this.editing = true;

  }

  onRowEditSave(user: User) {
    this.editing = false

  }

  onRowEditCancel(user: User) {
    this.editing = false

  }

  deleteSelected() {
    this.confirmationService.confirm({
      message: 'Удалить выбранные элементы?',
      header: 'Подтверждение.',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.selectedUsers?.length && this.usersService.delete(this.selectedUsers[0]).pipe(
          take(1),
          tap(res => {
            this.users = this.users.filter(user => {
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
    const id = this.selectedUsers?.[0].id
    this.router.navigate(['user-edit', id], {state: {id : id}})
  }

  hideDialog() {
    this.userAddDialog = false;
    this.submitted = false;
  }
  openUserDetails(event : Event, user: User){
    if((event?.currentTarget as HTMLElement)?.localName === 'tr') this.router.navigate(['user-detail', user.id], {state: {user}});
    else event.stopImmediatePropagation();
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
  updateSelected(){
    this.usersService.update(this.selectedUsers?.[0] as User).pipe(
      take(1),
      tap(res => {
      this.selectedUsers = null;
      this.messageService.add({ severity: 'success', summary: 'Выполнено!', detail: 'Обновление пользователя', life: 2000 });
    })).subscribe();
  }

  save() {
    this.submitted = true;
/*
    if (this.user.name?.trim()) {
      if (this.user.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      } else {
        this.user.id = this.createId();
        this.products.push(this.product);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.user = {} as User;
    }*/
  }

}
