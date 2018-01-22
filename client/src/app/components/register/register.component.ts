import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form : FormGroup;
  messageClass;
  message;
  processing = false;
  emailValid;
  emailMessage;
  usernameValid;
  usernameMessage;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createNewForm();
  }

  createNewForm(){
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(5),
        this.validateEmail
      ])],
      username: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3),
        this.validateUsername
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(16),
        Validators.minLength(6),
        this.validatePassword
      ])],
      confirm: ['', Validators.required]
    }, {validator: this.matchingPassword('password', 'confirm')});
  }

  validateEmail(controls){
    const regExp = new RegExp(/^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {'validateEmail' : true}
    }
  }

  validateUsername(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {'validateUsername' : true}
    }
  }

  validatePassword(controls){
    const regExp = new RegExp(/^[a-zA-Z0-9]+$/);
    if (regExp.test(controls.value)) {
      return null;
    } else {
      return {'validatePassword' : true}
    }
  }

  matchingPassword(password, confirm){
    return (group: FormGroup) => {
      if (group.controls[password].value === group.controls[confirm].value) {
        return null;
      } else {
        return {'matchingPassword': true};
      }
    }
  }

  onRegisterSubmit(){
    this.processing = true;
    this.disableForm();
    const user = {
      email: this.form.get('email').value,
      username: this.form.get('username').value,
      password: this.form.get('password').value,
    };

    this.authService.registerUser(user).subscribe(data => {
      if (!data['success']) {
        this.message = data['message'];
        this.messageClass = 'alert alert-danger';
        this.processing = false;
        this.enableForm();
      } else {
        this.message = data['message'];
        this.messageClass = 'alert alert-success';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    })
  }

  enableForm() {
    this.form.controls.username.enable();
    this.form.controls.email.enable();
    this.form.controls.password.enable();
    this.form.controls.confirm.enable();
  }

  disableForm() {
    this.form.controls.username.disable();
    this.form.controls.email.disable();
    this.form.controls.password.disable();
    this.form.controls.confirm.disable();
  }

  checkEmail() {
    this.authService.checkEmail(
      this.form.controls['email'].value).subscribe(data => {
        if (!data['success']) {
          this.emailValid = false;
          this.emailMessage = data['message'];
        } else {
          this.emailValid = true;
          this.emailMessage = data['message'];
        }
      }
    );
  }

  checkUsername() {
    this.authService.checkUsername(
      this.form.controls['username'].value).subscribe(data => {
        if (!data['success']) {
          this.usernameValid = false;
          this.usernameMessage = data['message'];
        } else {
          this.usernameValid = true;
          this.usernameMessage = data['message'];
        }
      }
    );
  }

  ngOnInit() {
  }

}
