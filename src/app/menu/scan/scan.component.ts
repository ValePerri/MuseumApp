import { Component } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';



@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['../menu.page.scss', './scan.component.scss'],
})
export class ScanComponent {
  constructor(private qrScanner: QRScanner) {
  }
  private goToBarcodeScan() {
    //console.log("PROVA");
    //this.qrScanner.scan();
    let scanSub = this.qrScanner.scan().subscribe((text: string) => {
      console.log('Scanned something', text);

      this.qrScanner.hide(); // hide camera preview
      scanSub.unsubscribe(); // stop scanning
    });

  }
}






