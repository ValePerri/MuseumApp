import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/server/user.service';
import { StorageService } from '../../services/client/storage.service';
import { ClientService } from '../../services/client/client.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-your-bookings',
  templateUrl: './your-bookings.component.html',
  styleUrls: ['../menu.page.scss', './your-bookings.component.scss'],
})
export class YourBookingsComponent{

  lista: any
  name: any

  constructor(private storage: StorageService, private userService: UserService, private clientService: ClientService) {
    
  }

  ionViewWillEnter(){
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
            this.clientService.showError(res['error']);
          } else {
            console.log(res);
            this.lista = res;
            //this.notificationService.showSuccess("Success");
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
            this.clientService.showError(res['error']);
          } else {
            console.log(res);
            this.lista = res;
            this.clientService.showSuccess("Booking removed with success");
          }
        }
      )
    });
    this.getbookings();
  } 

    
  


}