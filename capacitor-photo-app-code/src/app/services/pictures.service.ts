/**
 * PicturesService
 *
 * This class uses the Capacitor API to interact with the device camera and
 * photolibrary to capture images for rendering to the application 
 *
 * @author James Griffiths
 * @date 01/06/2020
 * @version 0.1
 * @export
 * @class PicturesService
 * @packageDocumentation
 */
import { Injectable } from '@angular/core';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * @ignore
 */
@Injectable({
  providedIn: 'root'
})
export class PicturesService {


  /**
   * @constructor
   * Creates an instance of PicturesService.
   * @param {DomSanitizer} sanitizer
   * @memberof PicturesService
   */
  constructor(private sanitizer: DomSanitizer) { }


  /**
   * @public
   * @async
   * @method selectImageWithCamera
   * @description   Uses the Capacitor getPhoto method to capture images using the device camera
   * @returns {Promise<any>}
   * @memberof PicturesService
   */
  public async selectImageWithCamera(): Promise<any> {
    const image: any = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    return this.sanitizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
  }


  /**
   * @public
   * @async
   * @method selectPhotoFromLibrary
   * @description   Uses the Capacitor getPhoto method to capture images using the device photolibrary
   * @returns {Promise<any>}
   * @memberof PicturesService
   */
  public async selectPhotoFromLibrary(): Promise<any> {
    const image: any = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
    return image.webPath;
  }


}
