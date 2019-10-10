import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/server/user.service';
import { StorageService } from '../../services/client/storage.service';
import { NotificationService } from '../../services/client/notification.service';

@Component({
  selector: 'app-your-bookings',
  templateUrl: './your-bookings.component.html',
  styleUrls: ['../menu.page.scss','./your-bookings.component.scss'],
})
export class YourBookingsComponent  {

  elem1: any
  elem2: any
  elem3: any

  constructor(private storage: StorageService, private userService: UserService, private notificationService: NotificationService ) {
    this.getbookings();
   }

  private getbookings(){

    this.storage.getUser().then(user => {
      this.userService.getbookings({
        username: user.username,
      }).subscribe(
        res => {
          if (res['error']) {
            this.notificationService.showError(res['error']);
          } else {
            this.elem1 = res[0];
            this.elem2 = res[1];
            this.elem3 = res[2];
            console.log(res);
            this.notificationService.showError("Success");
          }
        }
      )

    });


  }


}
