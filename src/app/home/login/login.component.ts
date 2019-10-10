import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { UserService } from '../../services/server/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/client/notification.service';
import { StorageService } from '../../services/client/storage.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../home.page.scss', './login.component.scss'],
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private storage: StorageService, private router: Router, private formBuilder: FormBuilder, private userService: UserService, private notificationService: NotificationService) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', [
        Validators.minLength(4),
        Validators.maxLength(18),
        Validators.pattern('^[a-zA-Z]+(([\' ][a-zA-Z])?[a-zA-Z]*)*$'),
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.minLength(8),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).*$'),
        Validators.required
      ])
    });
  }

  public onLogin(): void {
    //console.log(true);
    this.userService.loginWithCredentials({
      username: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(
      res => {
        if (res['exists']) {
          this.notificationService.showSuccess('Login effettuato!');
          this.storage.setUser({
            username: this.loginForm.value.username,
            password: this.loginForm.value.password});
          this.router.navigateByUrl('');
          this.loginForm.reset();
        } else {
          this.notificationService.showError(res['error']);
        }
      }
    )
  }

  public logged(): Promise<boolean> {
    return this.storage.getUser().then(
      user => {
        return user !== null;
      }
    )
  }


}
