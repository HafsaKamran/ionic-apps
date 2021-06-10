import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder, FormGroup, FormControl,	Validators } from '@angular/forms';
import { PicturesService } from '../services/pictures.service';

/**
 * @ignore
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


   /**
    * @name form
    * @type {FormGroup}
    * @public
    * @description     		Angular FormGroup object for managing form state
    */
   public form: FormGroup;


   /**
    * @name imageCaptured
    * @type {Boolean}
    * @public
    * @description     		Stores the state of the app - whether image has been captured or not
    */
   public imageCaptured = false;


   /**
    * @name capturedImage
    * @type {String}
    * @public
    * @description     		Stores the returned image string data from the Pictures Service
    */
   public capturedImage: string;


   /**
    * @name _loader
    * @type {Any}
    * @private
    * @description     		Stores the LoadingController object for 'preloading' data
    */
   private LOADER: any;


   /**
    * @constructor
    * Creates an instance of HomePage.
    * @param {AlertController} alert
    * @param {LoadingController} loading
    * @param {FormBuilder} fb
    * @param {PicturesService} picture
    * @memberof HomePage
    */
   constructor(private alert: AlertController,
               private loading: LoadingController,
               public fb: FormBuilder,
               private picture: PicturesService) {
      this.form 		= fb.group({
         imageSize	: ['', Validators.required],
         sourceType : ['', Validators.required]
      });
   }


   /**
    * Capture ion-range component slider value
    *
    * @public
    * @method captureImageWidth
    * @param dimension      {Any}        Captures the ion-range component slider value
    * @return {None}
    */
   public captureImageWidth(dimension: any): void {
      console.log(dimension.value);
   }


   /**
    * Capture form data from the template
    *
    * @public
    * @method captureImage
    * @param val      {Any}        Form data object
    * @return {None}
    */
   public captureImage(val: any): void {
      this.displayPreloader();

      switch (val.sourceType)
      {
         case '0':
            this.selectImageFromLibrary(val.imageSize, val.imageSize);
            break;


         case '1':
            this.selectImageWithCamera(val.imageSize, val.imageSize);
            break;


         case '2':
            this.selectImageFromSavedPhotoAlbum(val.imageSize, val.imageSize);
            break;
      }
   }


   /**
    * Select an image using the device camera
    *
    * @private
    * @method selectImageWithCamera
    * @param width      {Number}        supplied image width
    * @param height     {Number}        supplied image height
    * @return {None}
    */
   private selectImageWithCamera(width: number, height: number): void {
      this.picture
      .selectImageWithCamera(width, height)
      .then((data: string) => {
         this.imageCaptured = true;
         this.capturedImage = data.toString();
         this.hidePreloader();
      })
      .catch((error: any) => {
         this.displayAlert('Error', error.message);
      });
   }


   /**
    * Select an image from the device photolibrary
    *
    * @private
    * @method selectImageFromLibrary
    * @param width      {Number}        supplied image width
    * @param height     {Number}        supplied image height
    * @return {None}
    */
   private selectImageFromLibrary(width: number, height: number): void {
      this.picture
      .selectImageFromLibrary(width, height)
      .then((data: string) => {
         this.imageCaptured = true;
         this.capturedImage = data.toString();
         this.hidePreloader();
      })
      .catch((error: any) => {
         this.displayAlert('Error', error.message);
      });
   }


   /**
    * Select an image from the device saved photo album
    *
    * @private
    * @method selectImageFromSavedPhotoAlbum
    * @param width      {Number}        supplied image width
    * @param height     {Number}        supplied image height
    * @return {None}
    */
   private selectImageFromSavedPhotoAlbum(width: number, height: number): void {
      this.picture
      .selectImageFromSavedPhotoAlbum(width, height)
      .then((data: string) => {
         console.log('selectImageFromSavedPhotoAlbum');
         this.imageCaptured = true;
         this.capturedImage = data.toString();
         this.hidePreloader();
      })
      .catch((error: any) => {
         this.displayAlert('Error', error.message);
      });
   }


   /**
    * Reset the application
    *
    * @public
    * @method retakeImageCapture
    * @return {None}
    */
   public retakeImageCapture(): void {
      this.imageCaptured = !this.imageCaptured;
   }


   /**
    * Display the LoadingController component
    *
    * @private
    * @async
    * @method displayPreloader
    * @return {Promise}
    */
   private async displayPreloader(): Promise<any>    {
      this.LOADER = await this.loading.create();
      return await this.LOADER.present();
   }


   /**
    * Hide the LoadingController component
    *
    * @private
    * @method hidePreloader
    * @return {None}
    */
   private hidePreloader(): void {
      this.LOADER.dismiss();
   }


   /**
    * Display an alert window using Ionic AlertController component
    * 
    * @private
    * @async
    * @method displayAlert
    * @param title      {String}        The heading for the alert window
    * @param message    {String}        The message for the alert window
    * @return {Promise}
    */
   private async displayAlert(title: string,
                              message: string): Promise<any> {
      const headsUp 	= await this.alert.create({
         header 	  : title,
         subHeader    : message,
         buttons 	  : ['Got It!']
      });
      await headsUp.present();
   }

}

