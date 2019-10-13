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

  constructor(private menu: MenuController, private storage: StorageService) {

    this.menu.enable(true, "custom");
    this.oninit();
    
  }

  oninit(){
    this.storage.getUser().then(user => {
      this.name = user.username    
    })
  }

}