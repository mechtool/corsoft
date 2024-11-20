import {Component, Input} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ChipsModule} from 'primeng/chips';
import {InputMaskModule} from 'primeng/inputmask';
import {FloatLabelModule} from 'primeng/floatlabel';
import {Button} from 'primeng/button';
import {NgIf} from '@angular/common';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {tap} from 'rxjs';
import {DialogModule} from 'primeng/dialog';

@Component({
  selector: 'app-user-form-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ChipsModule,
    InputMaskModule,
    FloatLabelModule,
    Button,
    NgIf,
    ToggleButtonModule,
    ToolbarModule,
    DialogModule,
    RouterLink
  ],
  templateUrl: './user-form-component.component.html',
  styleUrl: './user-form-component.component.scss'
})
export class UserFormComponentComponent {
  formHeader = '';
  userForm = new FormGroup({
    name: new FormControl('', {validators: [Validators.required]}),
    username: new FormControl('', {validators: [Validators.required]}),
    phone: new FormControl('', {validators: [Validators.required]}),
    email: new FormControl('', {validators: [Validators.required, Validators.email]}),
    website: new FormControl('', {validators: [Validators.required]}),
  });
  constructor(private activatedRoute: ActivatedRoute) {

   this.activatedRoute.data.pipe(tap(data => {
       this.formHeader = data['header'];
    })).subscribe() ;
  }
  save(){

  }
}
