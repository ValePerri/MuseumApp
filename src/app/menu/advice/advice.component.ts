import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/client/storage.service';
import { NotificationService } from '../../services/client/notification.service';
import { UserService } from '../../services/server/user.service';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['../menu.page.scss', './advice.component.scss'],
})
export class AdviceComponent implements OnInit {

  lista: any
  name: any
  errorname: any
  style: any

  constructor(private storage: StorageService, private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.getAdvice()
  }

  private getAdvice() {

    this.storage.getUser().then(user => {
      console.log(user.username);
      this.name = user.username;
      this.userService.getadvice({
        userN: this.name,
      }).subscribe(
        res => {
          if(res['error']){
            this.notificationService.showError("You have not yet expressed any preference");
          }else{
          console.log(res);
          this.lista = res;
          this.style =  res[0]['style'];
          this.notificationService.showSuccess("Success");
          }
        }
      )
    });
  }

}


