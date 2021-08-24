/**
 * HomePage component - entry point for the application that manages the following:
 * 1. Defines animation properties/triggers
 * 2. Provides the data for the image gallery
 * @module HomePage
 * @author James Griffiths
 */
import { Component, OnInit } from '@angular/core';
import { Animation, AnimationController } from '@ionic/angular';
import { Location } from '../interfaces/location';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  /**
   * Stores the title to be displayed on the sliding animation panel
   * @name panelTitle
   * @type {string}
   * @public
   */
  public panelTitle: string;



  /**
   * Stores the description to be displayed on the sliding animation
   * @name panelDesc
   * @type {string}
   * @public
   */
  public panelDesc: string;



  /**
   * Stores the image value to be displayed on the sliding animation panel
   * @name panelImage
   * @type {string}
   * @public
   */
  public panelImage: string;


  /**
   * Flag used to determine whether animation panel is active
   * @name expanded
   * @type {boolean}
   * @public
   */
  public expanded	= false;



  /**
   * Flag used to determine whether animation panel is active
   * @name isActive
   * @type {boolean}
   * @public
   */
  public isActive = false;



  /**
   * Array of gallery locations to be rendered to the component template
   * @name items
   * @type {Array<Location>}
   * @public
   */
  public items: Array<Location> 	= [
  {
     title 		            : 'London Underground',
     description	        : 'Rarely deserted Tube platform',
     thumbnail		        : 'assets/imgs/gallery-thumbnail-1.jpg',
     image			          : 'assets/imgs/gallery-1.jpg'
  },
  {
     title 		            : 'Bolsover Castle',
     description	        : 'A fine piece of English heritage',
     thumbnail		        : 'assets/imgs/gallery-thumbnail-2.jpg',
     image			          : 'assets/imgs/gallery-2.jpg'
  },
  {
     title 		            : 'Atomium',
     description	        : 'Brussels architecture and attractions',
     thumbnail		        : 'assets/imgs/gallery-thumbnail-3.jpg',
     image			          : 'assets/imgs/gallery-3.jpg'
  },
  {
     title 		            : 'Venice',
     description	        : 'Authentic Venetian experience',
     thumbnail		        : 'assets/imgs/gallery-thumbnail-4.jpg',
     image			          : 'assets/imgs/gallery-4.jpg'
  },
  {
     title 		            : 'Paris',
     description	        : 'Louvre Pyramid',
     thumbnail		        : 'assets/imgs/gallery-thumbnail-5.jpg',
     image			          : 'assets/imgs/gallery-5.jpg'
  },
  {
     title 		            : 'Greenwich',
     description	        : 'Interesting and unusual sundial',
     thumbnail		        : 'assets/imgs/gallery-thumbnail-6.jpg',
     image			          : 'assets/imgs/gallery-6.jpg'
  },
  {
     title 		            : 'Piccadilly Circus',
     description	        : 'Heart of the City',
     thumbnail		        : 'assets/imgs/gallery-thumbnail-7.jpg',
     image			          : 'assets/imgs/gallery-7.jpg'
  },
  {
     title 		            : 'Erasmusbrug',
     description	        : 'Rotterdam’s mighty red bridge',
     thumbnail		        : 'assets/imgs/gallery-thumbnail-8.jpg',
     image			          : 'assets/imgs/gallery-8.jpg'
  },
  {
     title 		            : 'Rotterdam',
     description	        : 'Dutch parking',
     thumbnail		        : 'assets/imgs/gallery-thumbnail-9.jpg',
     image			          : 'assets/imgs/gallery-9.jpg'
  },
  {
     title 		            : 'Henry Moore',
     description	        : 'Fine English sculpture',
     thumbnail		        : 'assets/imgs/gallery-thumbnail-10.jpg',
     image			          : 'assets/imgs/gallery-10.jpg'
  }];


  /**
   * Object for managing the opening animation
   * @private
   * @name openAnimation
   * @type {Animation}
   * @memberof HomePage
   */
  private openAnimation: Animation;


  /**
   * Object for managing the closing animation
   * @private
   * @name closeAnimation
   * @type {Animation}
   * @memberof HomePage
   */
  private closeAnimation: Animation;


  /**
   * Defines the duration of the animation for the sliding panel
   * @private
   * @name DURATION
   * @type {number}
   * @memberof HomePage
   */
  private DURATION = 750;


  /**
   * Creates an instance of HomePage
   * @constructs
   * @param {AnimationController} animationCtrl
   */
  constructor(private animationCtrl: AnimationController) {  }


  /**
   * @method ngOnInit
   */
  ngOnInit(): void { }


  /**
   * Defines the animation logic for triggering the display of the image panel
   * @private
   * @method startAnimation
   * @memberof HomePage
   * @returns none
   */
  private startAnimation(): void {
    this.openAnimation = this.animationCtrl
                          .create()
                          .addElement(document.querySelector('.panel'))
                          .duration(this.DURATION)
                          .fromTo('transform', 'translateX(0)', 'translateX(-100%)');
    this.openAnimation.play();
  }


  /**
   * Defines the animation logic for triggering the hiding of the image panel
   * @private
   * @method finishAnimation
   * @returns none
   */
  private finishAnimation(): void {
    this.closeAnimation = this.animationCtrl
                          .create()
                          .addElement(document.querySelector('.panel'))
                          .duration(this.DURATION)
                          .fromTo('transform', 'translateX(-100%)', 'translateX(0)');
    this.closeAnimation.play();
  }


  /**
   * Determines the state of the sidebar panel (I.e. whether displayed, what content is loaded)
   * @public
   * @method togglePanel
   * @param {Location}    item      (Optional) Object that represents the gallery location data to be displayed      
   * @return {none}
   */
  public togglePanel(item: Location = null): void {
    this.expanded 		= !this.expanded;
    if (this.expanded) {
      this.isActive = true;
      this.startAnimation();
    } else {
      this.isActive	= false;
      this.finishAnimation();
    }
    this.isContentDisplayed(item);
  }


  /**
   * Determines whether content is displayed for the sliding panel
   * @private
   * @method isContentDisplayed
   * @param {Location} item
   * @returns none
   */
  private isContentDisplayed(item: Location): void {
    if (item !== null) {
      this.panelTitle = item.title;
      this.panelDesc 	= item.description;
      this.panelImage	= item.image;
    }
  }

}
