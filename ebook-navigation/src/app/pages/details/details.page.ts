import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  constructor(private _route : ActivatedRoute) { }
  // Executed when component is first initialized
  // Here we subscribe to and display our routing parameters
  ngOnInit() : void {
    this._route
    .data
    .subscribe((val) => {
      console.dir(val);
    });
  } 
}