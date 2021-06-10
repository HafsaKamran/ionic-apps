/**
 * HomePage
 *
 * This class uses the PicturesService to access the Capacitor API to interact with the
 * device camera and photolibrary to capture images for rendering to the application 
 *
 * @author James Griffiths
 * @date 01/06/2020
 * @version 0.1
 * @export
 * @class HomePage
 * @packageDocumentation
 */
import { Component } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';
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
   private loader: any;


   /**
    * @constructor
    * Creates an instance of HomePage.
    * @param {PicturesService} pictures
    * @param {FormBuilder} fb
    * @param {AlertController} alert
    * @param {LoadingController} loading
    * @memberof HomePage
    */
   constructor(private pictures: PicturesService,
               private fb: FormBuilder,
               private alert: AlertController,
               private loading: LoadingController) {
    this.form 		= this.fb.group({
      sourceType : ['', Validators.required]
    });
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

      switch (val.sourceType) {
         case '0':
            this.selectImageFromLibrary();
            break;

         case '1':
            this.selectImageWithCamera();
            break;
      }
   }


   /**
    * Select an image using the device camera
    *
    * @private
    * @method _selectImageWithCamera
    * @return {None}
    */
   private selectImageWithCamera(): void {
      this.pictures
      .selectImageWithCamera()
      .then((data: string) => {
         this.imageCaptured = true;
         this.capturedImage = data;
         this.hidePreloader();
      })
      .catch((error: any) => {
         this.hidePreloader();
         this.displayAlert('Error', error.message);
      });
   }


   /**
    * Select an image from the device photolibrary
    *
    * @private
    * @method _selectImageFromLibrary
    * @return {None}
    */
   private selectImageFromLibrary(): void {
      this.pictures
      .selectPhotoFromLibrary()
      .then((data: string) => {
         this.imageCaptured = true;
         this.capturedImage = data;
         this.hidePreloader();
      })
      .catch((error: any) => {
         this.hidePreloader();
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
    * @async
    * @method _displayPreloader
    * @return {Promise}
    */
   async displayPreloader(): Promise<any> {
      this.loader = await this.loading.create();
      return await this.loader.present();
   }


   /**
    * Hide the LoadingController component
    *
    * @private
    * @method _hidePreloader
    * @return {None}
    */
   private hidePreloader(): void {
      this.loader.dismiss();
   }


   /**
    * Display an alert window using Ionic AlertController component
    *
    * @async
    * @method _displayAlert
    * @param title      {String}        The heading for the alert window
    * @param message    {String}        The message for the alert window
    * @return {Promise}
    */
   async displayAlert(title: string, message: string): Promise<any> {
      const headsUp 	= await this.alert.create({
         header 	  : title,
         subHeader  : message,
         buttons 	  : ['Got It!']
      });
      await headsUp.present();
   }
}
