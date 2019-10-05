import { Component} from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['../menu.page.scss','./scan.component.scss'],
})
export class ScanComponent  {

  constructor(private menu: MenuController) { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }
  
}
