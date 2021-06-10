import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  
  /**
    * @name items
    * @type {array}
    * @public
    * @description     		Defines the basic list for the template
    */
   public items: Array<{ title: string, link: string }>;



   constructor() {
       this.items = [{
          title : 'British Comics (1960 - 1990)',
          link  : 'uk-comics'
       },
       {
          title : 'Boring Political discussions',
          link  : 'politics'
       },
       {
          title : 'American Comics (1960 - 1990)',
          link  : 'us-comics'
       }];
   }

}
