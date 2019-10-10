import { Component } from '@angular/core';
import { ZBar } from '@ionic-native/zbar/ngx'
import { Paintings } from '../../interfaces/paintings';
import { UserService } from '../../services/server/user.service';
import { NotificationService } from '../../services/client/notification.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/client/storage.service';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup ,FormControl} from '@angular/forms';



@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['../menu.page.scss', './scan.component.scss'],
})
export class ScanComponent {
  zbarOptions: any;
  scannedResult: any;
  title: any;
  author: any;
  splitted: any;
  description: any;
  year: any;
  image: any;
  style: any;
  feedbackForm: FormGroup;
  user: User;
  qrcode: string


  constructor(private storage: StorageService,
    private zbar: ZBar, private userService: UserService,
    private notificationService: NotificationService, private router: Router,
    private formBuilder: FormBuilder) {

    this.zbarOptions = {
      flash: 'off',
      drawSight: false
    }
    this.image = "qrscanner.png";
    this.feedbackForm = this.formBuilder.group({
      rate: new FormControl('', [
      ]),
    });



  }

  private scanCode() {

    this.zbar.scan(this.zbarOptions)
      .then(result => {
        this.router.navigateByUrl('menu/scan');
        console.log(result); // Scanned code
        this.scannedResult = result;
        this.splitted = result.split("_");
        this.userService.getPainting({
          qrcode: this.splitted[0]
        }).subscribe(
          res => {
            if (res['error']) {
              this.notificationService.showError(res['error']);
            } else {
              this.notificationService.showSuccess("Success");
              this.author = res['author'];
              this.title = res['title'];
              this.description = res['description'];
              this.year = res['year'];
              this.style = res['style'];
              this.image = res['image'];
            }
          }
        )
      })
      .catch(error => {
        alert(error); // Error message
      });
  }

  private onFeed(): void {
    console.log(this.feedbackForm.value.rate);

    this.storage.getUser().then(user => {
      this.userService.feedback({
        userN:user.username,
        qrid: this.splitted[0],
        rate: this.feedbackForm.value.rate 
     }).subscribe(            
        res => {  
          if (res['success']) {
            this.notificationService.showSuccess(res['success']);
          } else {
            this.notificationService.showError(res['error']);
          }
        }
      )
    });

    

  }


}