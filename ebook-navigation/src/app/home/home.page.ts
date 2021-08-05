import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  /**
  * Defines the ebook product list for the template
  */
  public ebooks : Array<{id : number, title : string}> = [
    { id : 1, title: 'Mastering Ionic : The definitive guide' },
    { id : 2, title: 'Mastering Ionic : Building a real world application' },
    { id : 3, title: 'Mastering Ionic : Developing Firebase applications' }
  ];

  constructor(private router : Router) { }
  
  /**
  * Capture ebook Id for navigateByUrl method of the Angular Router module
  */
  public viewEbookDetailsByNavigateUrl(id : number) : void {
    this.router.navigateByUrl(`/details/${id}`);
  }

  /**
  * Capture ebook Id for navigate method of the Angular Router module
  */
  public viewEbookDetailsByNavigate(id : number) : void { 
    this.router.navigate(['/details/', id]);
  }
}