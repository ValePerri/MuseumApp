import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ScanComponent } from './scan/scan.component';
import { AdviceComponent } from './advice/advice.component';
import { BookingComponent } from './booking/booking.component'
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
      CommonModule,
      IonicModule,
      ReactiveFormsModule,
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
            },
            {
                path: 'booking',
                component: BookingComponent
            }
        ]
    }
    ])
  ],
  declarations: [MenuPage, AboutusComponent, ScanComponent, AdviceComponent, BookingComponent]
})
export class MenuPageModule {}
