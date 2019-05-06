import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-in-mobile',
  templateUrl: './details-in-mobile.component.html',
  styleUrls: ['./details-in-mobile.component.scss']
})
export class DetailsInMobileComponent implements OnInit {

  public backgroundPanels = new Array<number>(12);
  public bottomSpeakers = new Array<number>(6);
  public equalizers = new Array<number>(3);

  constructor() { }

  ngOnInit() {
  }

}
