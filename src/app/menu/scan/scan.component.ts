import { Component } from '@angular/core';
import { ZBar } from '@ionic-native/zbar/ngx'
import { Paintings } from '../../interfaces/paintings';
import { UserService } from '../../services/server/user.service';
import { NotificationService } from '../../services/client/notification.service';
import { Router } from '@angular/router';



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


  constructor(private zbar: ZBar, private userService: UserService, private notificationService: NotificationService, private router: Router) {

    this.zbarOptions = {
      flash: 'off',
      drawSight: false
    }

  }

  scanCode() {

    this.zbar.scan(this.zbarOptions)
      .then(result => {
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
              this.image = res['image'];
              console.log(res['description'])
              //this.router.navigateByUrl('home/login');
            }
          }
        )            
      })
      .catch(error => {
        alert(error); // Error message
      });
  }

  /*private getinfo():void{
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
          console.log(res['author'])
          console.log(res['title'])
          //this.router.navigateByUrl('home/login');
        }
      }
    )
  }*/

}