import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.page.html',
  styleUrls: ['./tweets.page.scss'],
})
export class TweetsPage implements OnInit, OnDestroy {

  /**
   * @constructor
   * Creates an instance of TweetsPage.
   * @param {ActivatedRoute} route
   * @memberof TweetsPage
   */
  constructor(private route: ActivatedRoute) {
     console.log(this.route.snapshot.paramMap.get('id'));
  }


  ngOnInit() {
    console.log('We are now entering the TweetsPage view');
  }


  ngOnDestroy() {
    console.log('We are now leaving the TweetsPage view');
  }

}
