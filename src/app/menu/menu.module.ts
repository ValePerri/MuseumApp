import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ScanComponent } from './scan/scan.component';
import { AdviceComponent } from './advice/advice.component';

@NgModule({
  imports: [
      CommonModule,
      IonicModule,
      RouterModule.forChild([
      {
        path: '',
        //canActivate: [Logged],
        children: [
            {
                path: '',
                component: MenuPage
            },
            {
                path: 'scan',
                component: ScanComponent
            },
            {
                path: 'advice',
                component: AdviceComponent
            },
            {
                path: 'aboutus',
                component: AboutusComponent
            }
        ]
    }
    ])
  ],
  declarations: [MenuPage, AboutusComponent, ScanComponent, AdviceComponent]
})
export class MenuPageModule {}
