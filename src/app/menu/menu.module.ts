import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ScanComponent } from './scan/scan.component';
import { AdviceComponent } from './advice/advice.component';
import { BookingComponent } from './booking/booking.component';
import { ReactiveFormsModule } from '@angular/forms';
import { YourBookingsComponent } from './your-bookings/your-bookings.component';
import { DiscoverComponent } from '../menu/discover/discover.component';

@NgModule({
  imports: [
      CommonModule,
      IonicModule,
      ReactiveFormsModule,
      RouterModule.forChild([
      {
        path: '',
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
            },            
            {
                path: 'yourbookings',
                component: YourBookingsComponent
            },            
            {
                path: 'discover',
                component: DiscoverComponent
            }
        ]
    }
    ])
  ],
  declarations: [MenuPage, AboutusComponent, ScanComponent, AdviceComponent, BookingComponent, YourBookingsComponent, DiscoverComponent]
})
export class MenuPageModule {}
