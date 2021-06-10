import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsGuardGuard implements CanActivate {

  constructor(private alert: AlertController) {}


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const id: string = next.paramMap.get('id');
    // If the supplied value of the id parameter is NOT politics we're good!
    if (id !== 'politics') {
      return true;
    // Otherwise we DON'T render the requested route :-(
    } else {
      const heading    = 'Route guard error',
            message    = 'Angular route guards prevent this route being activated :-/';

      this.displayAlert(heading, message);
      return false;
    }
  }


  /**
   * Display an alert window using Ionic AlertController component
   * @async
   * @method _displayAlert
   * @param title {String}
   * @param message {String} 
   * @return {Promise}
   */
  private async displayAlert(title: string, message: string): Promise<any> {
    const headsUp = await this.alert.create({
      header: title,
      subHeader: message,
      buttons: ['Got it!']
    });
    await headsUp.present();
  } 

}
