import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/server/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/client/notification.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../home.page.scss', './signup.component.scss'],
})
export class SignupComponent {

  signupForm: FormGroup;

  constructor(
    public router: Router,
    public formBuilder: FormBuilder,
    public userService: UserService,
    public notificationService: NotificationService) {

    this.signupForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(18),
        Validators.pattern('^[a-zA-Z]+(([\' ][a-zA-Z])?[a-zA-Z]*)*$'),
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.pattern('^[a-z]\\.?[a-z0-9]+@{1}(studenti.)?unisa\\.it$'),
        Validators.required,
      ]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).*$'),
        Validators.required
      ]),
    });
  }

  public onSignup(): void {
    
    if (this.signupForm.valid) {
      //console.log(true);
      this.userService.signup({
        username: this.signupForm.value.username,
        password: this.signupForm.value.password,     
        email: this.signupForm.value.email
      }).subscribe(
        res => {
          if(res['error']){        
            this.notificationService.showError(res['error']);
          }else{
            this.notificationService.showSuccess('Registrazione effettuata con successo.');
            this.router.navigateByUrl('home/login');
          }
        }
      )
    }
  }

  

}
