import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { StorageService } from '../services/client/storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss'],
})
export class MenuPage {

  name: any
  isenabled: boolean = false

  constructor(private menu: MenuController, private storage: StorageService) {

    this.menu.enable(true, "custom");    
  }


  ionViewWillEnter(){
    this.storage.getUser().then(user => {
      this.name = user.username    
    })
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

}