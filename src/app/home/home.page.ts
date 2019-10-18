import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { UserService } from '../services/server/user.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../services/client/client.service';
import { StorageService } from '../services/client/storage.service'
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  loginForm: FormGroup;

  constructor(private storage: StorageService,
    private router: Router, private formBuilder: FormBuilder,
    private userService: UserService, private clientService: ClientService,
    private menu: MenuController) {

    this.menu.enable(false, "custom");
    
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
          this.clientService.showSuccess('Login effettuato!');
          this.storage.setUser({
            username: this.loginForm.value.username,
            password: this.loginForm.value.password,
            auth: "true",
          });
          this.router.navigateByUrl('/menu');
          this.loginForm.reset();
        } else {
          this.clientService.showError(res['error']);
        }
      }
    )
  }

  public anonimUser(): void {
    //console.log(true);
      this.storage.setUser({
        username: "Anonymous",
        password: "randomPass9",
        auth: "false",
      });
      this.router.navigateByUrl('/menu');
    }
  

  


}




