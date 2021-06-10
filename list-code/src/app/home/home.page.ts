import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  /**
   * @public
   * @property pages
   * @type {Array<{title: string, link: any}>}
   * @memberof HomePage
   */
  public pages: Array<{title: string, link: any}>;


  /**
   * @public
   * @property isSuccess
   * @type {boolean}
   * @memberof HomePage
   */
  public isSuccess: boolean;


  /**
   * @public
   * @property isError
   * @type {boolean}
   * @memberof HomePage
   */
  public isError: boolean;


  /**
   * @public
   * @property isWarning
   * @type {boolean}
   * @memberof HomePage
   */
  public isWarning: boolean;


  /**
   * @public
   * @property canProceed
   * @type {boolean}
   * @memberof HomePage
   */
  public canProceed: boolean;


  /**
   * @constructor
   * Creates an instance of HomePage.
   * @param {Router} router
   * @memberof HomePage
   */
  constructor(private router: Router) {
    this.pages = [
        { title   : 'About this App',
          link    : 'about'
        },
        { title   : 'Contact Us',
          link    : 'contact'
        },
        { title   : 'Latest Tweets',
          link    : 'tweets'
        }
    ];
    this.isSuccess    = true;
    this.isError      = false;
    this.isWarning    = false;
    this.canProceed   = true;
   }



   /**
    * @public
    * @method setNavigationLink
    * @param {*} page
    * @memberof HomePage
    * @returns none
    */
   public setNavigationLink(page: any): void {
      this.router.navigateByUrl('/' + page.link);
   }


   /**
    * @public
    * @method elementClasses
    * @returns {*}
    * @memberof HomePage
    */
   public elementClasses(): any {
      const classes: any =  {
         isSuccess: this.isSuccess,
         isError: this.isError,
         isWarning: this.isWarning,
         canProceed: this.canProceed
      };
      return classes;
   }

}
