import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { StorageService } from '../client/storage.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss'],
})
export class ServerComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
