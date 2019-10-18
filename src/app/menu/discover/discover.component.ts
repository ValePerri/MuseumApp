import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/client/storage.service';
import { ClientService } from '../../services/client/client.service';
import { UserService } from '../../services/server/user.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['../menu.page.scss','./discover.component.scss'],
})
export class DiscoverComponent{

  constructor(private storage: StorageService, private userService: UserService, 
    private clientService: ClientService, private loadingController: LoadingController) { }

  lista: any
  name: any
  errorname: any
  style: any
  loaderToShow: any

  ionViewWillEnter(){
    this.getMost();    
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
    }, 12000);
  }

  private getMost() {

    this.storage.getUser().then(user => {
      console.log(user.username);
      this.name = user.username;
      this.userService.getMost({
        userN: this.name,
      }).subscribe(
        res => {
          if(res['error']){
            this.clientService.showError("You are not logged in!");
          }else{
          console.log(res);
          this.lista = res;
          this.clientService.showSuccess("Success");
          }
        }
      )
    });
  }


}
