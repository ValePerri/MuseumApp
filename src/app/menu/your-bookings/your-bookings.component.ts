import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/server/user.service';
import { StorageService } from '../../services/client/storage.service';
import { NotificationService } from '../../services/client/notification.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-your-bookings',
  templateUrl: './your-bookings.component.html',
  styleUrls: ['../menu.page.scss', './your-bookings.component.scss'],
})
export class YourBookingsComponent implements OnInit{

  lista: any
  name: any

  constructor(private storage: StorageService, private userService: UserService, private notificationService: NotificationService) {
    
  }
  ngOnInit() {    
    this.getbookings;
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
  private removebooking(date: Date, time: Time, numberp: number) {
    this.storage.getUser().then(user => {
      console.log(date, time, numberp)
      this.name = user.username;
      this.userService.removebookings({
        username: user.username,
        museumid: "1",
        date: date,
        time: time,
        numberp: numberp,
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
    this.refreshPage1()
  } 

    ionViewWillEnter(date: Date, time: Time, numberp: number){
        this.removebooking(date,time,numberp);
    }

    refreshPage(date: Date, time: Time, numberp: number) {
    this.ionViewWillEnter(date,time,numberp);
    }

    refreshPage1() {
      this.getbookings();
    }

}