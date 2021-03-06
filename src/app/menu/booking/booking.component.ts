import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../../services/client/client.service';
import { UserService } from '../../services/server/user.service';
import { StorageService } from '../../services/client/storage.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['../menu.page.scss', './booking.component.scss'],
})
export class BookingComponent {

  bookingForm: FormGroup;
  user: User;
  isenabled: boolean 

  constructor(private storage: StorageService, private router: Router, private formBuilder: FormBuilder, private userService: UserService, private clientService: ClientService) {
    this.bookingForm = this.formBuilder.group({
      time: new FormControl(),
      date: new FormControl(),
      numpeople: new FormControl(),
    });
  }

  ionViewWillEnter(){
    this.isAnonymous();
  }


  isAnonymous(){
    this.storage.getUser().then(user => {
      console.log(user.auth);
      if(user.auth=="true"){
        this.isenabled = true;
      }else{
        this.isenabled = false;
      }
    });
  }
  
  

  private onBook(): void {

    this.storage.getUser().then(user => {
      this.userService.booking({
        username: user.username,
        museumid: "1",
        date: this.bookingForm.value.date,
        time: this.bookingForm.value.time,
        numpeople: this.bookingForm.value.numpeople
      }).subscribe(
        res => {
          if (res['success']) {
            this.clientService.showSuccess(res['success']);
          } else {
            this.clientService.showError(res['error']);
          }
        }
      )

    });
  }
}
