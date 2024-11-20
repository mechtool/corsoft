import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChipsModule} from 'primeng/chips';
import {InputMaskModule} from 'primeng/inputmask';
import {FloatLabelModule} from 'primeng/floatlabel';
import {Button} from 'primeng/button';
import {CommonModule, NgIf} from '@angular/common';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {delay, take, tap} from 'rxjs';
import {DialogModule} from 'primeng/dialog';
import {UsersService} from '../users.service';
import {MessageService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {User} from '../model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-user-form-component',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChipsModule,
    InputMaskModule,
    FloatLabelModule,
    Button,
    NgIf,
    ToggleButtonModule,
    ToolbarModule,
    DialogModule,
    RouterLink,
    MessagesModule,
    ToastModule
  ],
  providers: [MessageService, UsersService],
  templateUrl: './user-form-component.component.html',
  styleUrl: './user-form-component.component.scss'
})
export class UserFormComponentComponent {
  formHeader = '';
  routerState: any;
  userForm = new FormGroup({
    name: new FormControl('', {validators: [Validators.required]}),
    username: new FormControl('', {validators: [Validators.required]}),
    phone: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    website: new FormControl('', {validators: [Validators.required]}),
  });
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private messageService: MessageService) {
   this.routerState = this.router.getCurrentNavigation()?.extras?.state;
   if(this.routerState?.user){
     //Заполнение формы
     Object.entries(this.routerState?.user).forEach(value => {
       this.userForm.get(value[0])?.setValue(value[1]);
     });
     this.userForm.updateValueAndValidity();
   }
   this.activatedRoute.data.pipe(tap(data => {
       this.formHeader = data['header'];
    })).subscribe() ;
  }
  save(){
    if(this.routerState?.user){
      //Редактируем или добавляем
      this.usersService.edit({...this.routerState.user, ...this.userForm.value as User}).pipe(
        take(1),
        tap((res)=> {
          this.goToList('Редактирование пользователя', res);
        }),
        delay(700),
        tap(res => {
          res instanceof  Error || this.usersService.findAndChange(res);
        })
        ).subscribe();
    }else{
      //New
      this.usersService.add({id: this.usersService.createId(), ...this.userForm.value} as User).pipe(take(1),
        tap(res => {
          this.goToList('Создание пользователя', res);
        }),
      delay(700),
      tap(res => {
          res instanceof  Error || this.usersService.findAndChange(res);
        })).subscribe()
    }
  }

  goToList(detail: string, user: User | Error){

    const isError = user instanceof  HttpErrorResponse
    this.messageService.add({ severity: isError ? 'error' : 'success', summary: isError ? 'Ошибка': 'Выполнено!', detail, life: 2000 });
    isError || setTimeout(()=> this.router.navigate(['/users-list']), 400);
  }
}
