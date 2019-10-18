import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/client/storage.service';
import { ClientService } from '../../services/client/client.service';
import { UserService } from '../../services/server/user.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-advice',
  templateUrl: './advice.component.html',
  styleUrls: ['../menu.page.scss', './advice.component.scss'],
})
export class AdviceComponent {

  lista: any
  name: any
  errorname: any
  style: any
  loaderToShow: any

  constructor(private storage: StorageService, private userService: UserService,
    private clientService: ClientService, private loadingController: LoadingController) {

    
     }

  ionViewWillEnter(){
    this.getAdvice();
    this.showLoader();
  }

  showLoader() {
    this.loaderToShow = this.loadingController.create({
      message: 'Please wait...'
    }).then((res) => {
      res.present();
 
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed!');
      });
    });
    this.hideLoader();
  }
 
  hideLoader() {
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 9000);
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
            this.clientService.showError("You have not yet expressed any preference");
          }else{
          console.log(res);
          this.lista = res;
          this.style =  res[0]['style'];
          this.clientService.showSuccess("Success");
          }
        }
      )
    });
  }

}


