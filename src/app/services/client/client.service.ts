import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    constructor(
        public toastController: ToastController
    ) { }

    public showSuccess(message: string): void {
        console.log('showSuccess: ' + message);
        this.presentToast(message);
    }

    public showError(message: string): void {
        this.presentToast(message);
        console.log('showError: ' + message);
    }


    async presentToast(message: string) {
        const toast = await this.toastController.create({
          message: message,
          duration: 2000
        });
        toast.present();
      }
}