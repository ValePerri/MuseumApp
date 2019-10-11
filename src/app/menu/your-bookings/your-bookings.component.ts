import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/server/user.service';
import { StorageService } from '../../services/client/storage.service';
import { NotificationService } from '../../services/client/notification.service';

@Component({
  selector: 'app-your-bookings',
  templateUrl: './your-bookings.component.html',
  styleUrls: ['../menu.page.scss', './your-bookings.component.scss'],
})
export class YourBookingsComponent implements OnInit{

  lista: any
  name: any

  constructor(private storage: StorageService, private userService: UserService, private notificationService: NotificationService) {
    this.getbookings();
  }
  ngOnInit() {
    this.getbookings();
  }


  private getbookings() {

    this.storage.getUser().then(user => {
      this.name = user.username;
      this.userService.getbookings({
        username: user.username,
      }).subscribe(
        res => {
          if (res['error']) {
            this.notificationService.showError(res['error']);
          } else {
            console.log(res);
            this.lista = res;
            this.notificationService.showSuccess("Success");
          }
        }
      )

    });


  }


}