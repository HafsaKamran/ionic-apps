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
   * @type {Array<{id: number, title: string, thumb: string, description: string, link: any}>}
   * @memberof HomePage
   */
  public pages: Array<{id: number, title: string, thumb: string, description: string, link: any}>;


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
      {
        id 				    : 1,
        title   			: 'About this App',
        thumb        	: 'assets/imgs/about.png',
        description  	: 'Who we are. What we do. Why we&rsquo;re here',
        link    			: 'about'
      },
      {
        id 				    : 2,
        title   			: 'Contact Us',
        thumb        	: 'assets/imgs/contact.png',
        description  	: 'Drop us a line and get in touch we&rsquo;d love to hear from you!',
        link    			: 'contact'
      },
      {
        id 				    : 3,
        title   			: 'Latest Tweets',
        thumb        	: 'assets/imgs/tweet.png',
        description  	: 'The latest news updates from our Twitter account',
        link    			: 'tweets'
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


   public buttonOne(page: string): void {
      console.log(`I could do a lot more than just print out this message for the ${page} page to the browser console`);
   }


   public buttonTwo(page: string): void {
      console.log(`Yep, I’m an under-performer for the ${page} page too :(`);
   }

}
