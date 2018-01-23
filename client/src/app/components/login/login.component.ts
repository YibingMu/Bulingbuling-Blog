import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  messageClass;
  message;
  processing = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createLoginForm();
  }

  createLoginForm(){
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  enableForm() {
    this.form.controls.username.enable();
    this.form.controls.password.enable();
  }

  disableForm() {
    this.form.controls.username.disable();
    this.form.controls.password.disable();
  }

  onLoginSubmit(){
    this.processing = true;
    this.disableForm();
    const user = {
      username: this.form.get('username').value,
      password: this.form.get('password').value
    };
    this.authService.login(user).subscribe(data => {
      if (!data['success']) {
        this.messageClass = 'alert alert-danger';
        this.message = data['message'];
        this.enableForm();
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data['message'];
        this.authService.storeUserData(data['token'], data['user'])
        setTimeout(() => {
          this.router.navigate(['/'])
        },1000)
      }
    })
  }

  ngOnInit() {
  }

}
