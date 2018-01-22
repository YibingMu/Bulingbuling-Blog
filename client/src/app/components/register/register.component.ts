import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form : FormGroup;

  constructor(
    private formBuilder: FormBuilder,
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
    console.log('HHHHHIIIII');
  }
  ngOnInit() {
  }

}
