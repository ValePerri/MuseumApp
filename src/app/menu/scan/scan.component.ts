import { Component, IterableDiffers } from '@angular/core';
import { ZBar } from '@ionic-native/zbar/ngx'
import { UserService } from '../../services/server/user.service';
import { ClientService } from '../../services/client/client.service';
import { Router } from '@angular/router';
import { StorageService } from '../../services/client/storage.service';
import { User } from '../../interfaces/user';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';




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
  audioON: boolean
  logged: boolean
  isenabled: boolean 



  constructor(private storage: StorageService,
    private zbar: ZBar, private userService: UserService,
    private clientService: ClientService, private router: Router,
    private formBuilder: FormBuilder,
    private tts: TextToSpeech) {

    this.zbarOptions = {
      flash: 'off',
      drawSight: false
    }

    this.feedbackForm = this.formBuilder.group({
      rate: new FormControl(),
    });
    
    
  }

  ionViewWillEnter(){
    this.image = "qrscanner.png";
    
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
              this.clientService.showError(res['error']);
            } else {
              this.clientService.showSuccess("Success");
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
        userN: user.username,
        qrid: this.splitted[0],
        rate: this.feedbackForm.value.rate
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

  private onSpeech() {

      if (this.audioON) {
        this.tts.speak({ text: "", locale: 'it-IT' })
          .then(() => console.log('Success'))
          .catch((reason: any) => console.log(reason));
        this.audioON = false;
      } else {
        this.audioON = true;
        this.tts.speak({ text: this.description, locale: 'it-IT' })
          .then(() => console.log('Success'))
          .catch((reason: any) => console.log(reason));
      }
  }

}


