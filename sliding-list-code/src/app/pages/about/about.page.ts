import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit, OnDestroy {

  /**
   * @constructor
   * Creates an instance of AboutPage.
   * @param {ActivatedRoute} route
   * @memberof AboutPage
   */
  constructor(private route: ActivatedRoute) {
     console.log(this.route.snapshot.paramMap.get('id'));
  }


  ngOnInit() {
    console.log('We are now entering the About view');
  }


  ngOnDestroy() {
    console.log('We are now leaving the About view');
  }

}
