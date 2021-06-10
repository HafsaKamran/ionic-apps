import { Component, AfterContentInit, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface IComics {
  list: any;
}


@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit, OnDestroy, AfterContentInit {

  /**
   * @name items
   * @type {Array}
   * @public
   * @description       Stores the routed data from the API call
   */
  public items: any;


  /**
   * Stores the title for the page based on the returned API data
   * @name title
   * @type {String}
   * @public
   * @description Stores the page title based on the returned API data 
   */
  public title = '';


  /**
   * @constructor
   * Creates an instance of DetailsPage.
   * @param {ActivatedRoute} route
   * @memberof DetailsPage
   */
  constructor(private route: ActivatedRoute) { }


  /**
   * Retrieve the routing parameter data using Angular's ngOnInit lifecycle
   * event
   * @public
   * @method ngOnInit
   * @returns {none}
   */
  ngOnInit(): void {
    console.log('ngOnInit called');
    // Retrieve the remotely fetched data from the snapshot data object using
    // an interface - named IComics - to define the 'shape' of the expected data
    // (note we access this as an array - named details after the key within the
    // resolve object of the App Routing module)
    const details: IComics = this.route.snapshot.data.details,

          // We also strip out the hyphens from the supplied URL parameter and
          // replace these with spaces instead - this amended value will now be
          // displayed as the title for the page
          title: string = this.route.snapshot.params.id.replace('-', '');

    this.items = details.list;
    this.title = title;
  }


  /**
   * Triggered when the template view is about to be entered 
   * @public
   * @method ionViewWillEnter
   * @returns {none}
   */
  ionViewWillEnter(): void {
    console.log('ionViewWillEnter called');
  }


  /**
   * Triggered when the component is about to be destroyed (exited) 
   * @public
   * @method ngOnDestroy
   * @returns {none}
   */
  ngOnDestroy(): void {
    console.log('ngOnDestroy called');
  }


  /**
   * Triggered when the template view has been exited
   * @public
   * @method ionViewDidLeave
   * @returns {none}
   */
  ionViewDidLeave(): void {
    console.log('ionViewDidLeave called');
  }


  /**
   * Triggered when the component is about to be destroyed (exited)
   * @public
   * @method ngOnDestroy
   * @returns {none}
   */
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit called');
  }

}
