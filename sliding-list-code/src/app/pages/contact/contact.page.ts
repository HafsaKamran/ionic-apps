import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit, OnDestroy {

  /**
   * @constructor
   * Creates an instance of ContactPage.
   * @param {ActivatedRoute} route
   * @memberof ContactPage
   */
  constructor(private route: ActivatedRoute) {
     console.log(this.route.snapshot.paramMap.get('id'));
  }


  ngOnInit() {
    console.log('We are now entering the ContactPage view');
  }


  ngOnDestroy() {
    console.log('We are now leaving the ContactPage view');
  }

}
