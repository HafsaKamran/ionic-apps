import { Injectable } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Injectable({
  providedIn: 'root'
})
export class PicturesService {




   /**
    * @name cameraImage
    * @type {string}
    * @public
    * @description     		String for Base64 encoded data from camera/photolibrary
    */
   public cameraImage: string;




   /**
    * @name _MAX_HEIGHT
    * @type {number}
    * @private
    * @description     		The maximum allowable height for the image
    */
   private MAX_HEIGHT = 500;




   /**
    * @name _MAX_WIDTH
    * @type {number}
    * @private
    * @description     		The maximum allowable width for the image
    */
   private MAX_WIDTH = 500;



   /**
    * @constructor
    * Creates an instance of PicturesService.
    * @param {Camera} camera
    * @memberof PicturesService
    */
   constructor(private camera: Camera) {  }




   /**
    *
    * Capture image from device camera and return as base64 data URI
    *
    * @public
    * @method selectImageWithCamera
    * @param imageWidth      {Number}        Numeric value for image width
    * @param imageHeight     {Number}        Numeric value for image height
    * @param imageQuality    {Number}        The quality of the image
    * @param imageFormat     {String}        JPEG or PNG image format (supplied in Mime-type format)
    * @return {Promise}
    */
   public selectImageWithCamera(imageWidth: number,
                                imageHeight: number): Promise<any> {
      return new Promise((resolve, reject) => {

         const imageDimensions: any  = this.calculateImageAspectRatio(imageWidth,
                                                                      imageHeight,
                                                                      this.MAX_WIDTH,
                                                                      this.MAX_HEIGHT);


         console.log('Calculated Image width: ' + imageDimensions.width);
         console.log('Calculated Image height: ' + imageDimensions.height);
         console.log('Max Image width: ' + this.MAX_WIDTH);
         console.log('Max Image height: ' + this.MAX_HEIGHT);


         this.camera
         .getPicture({
            sourceType         : this.camera.PictureSourceType.CAMERA,
            destinationType    : this.camera.DestinationType.DATA_URL,
            mediaType          : this.camera.MediaType.PICTURE,
            targetWidth        : imageDimensions.width,
            targetHeight       : imageDimensions.height
         })
         .then((data: string) => {
            console.log('Image width: ' + imageWidth);
            console.log('Image height: ' + imageHeight);
            this.cameraImage  = 'data:image/jpeg;base64,' + data;
            resolve(this.cameraImage);
         })
         .catch((err: any) => {
            reject(err);
         });
      });
   }


   /**
    *
    * Capture image from device photolibrary and return as base64 data URI
    *
    * @public
    * @method selectImageFromLibrary
    * @param imageWidth      {Number}        Numeric value for image width
    * @param imageHeight     {Number}        Numeric value for image height
    * @return {Promise}
    */
   public selectImageFromLibrary(imageWidth: number,
                                 imageHeight: number): Promise<any> {
      return new Promise((resolve, reject) => {
         const imageDimensions: any  = this.calculateImageAspectRatio(imageWidth,
                                                                      imageHeight,
                                                                      this.MAX_WIDTH,
                                                                      this.MAX_HEIGHT);

         // Define image options
         const imageOptions: CameraOptions = {
             sourceType         : this.camera.PictureSourceType.PHOTOLIBRARY,
             destinationType    : this.camera.DestinationType.DATA_URL,
             mediaType          : this.camera.MediaType.PICTURE,
             quality            : 100,
             targetWidth        : imageDimensions.width,
             targetHeight       : imageDimensions.height,
             encodingType       : this.camera.EncodingType.JPEG,
             correctOrientation : true
         };

         this.camera
         .getPicture(imageOptions)
         .then((data: string) => {
            console.log('Image width: ' + imageWidth);
            console.log('Image height: ' + imageHeight);
            this.cameraImage 	= 'data:image/jpeg;base64,' + data;
            resolve(this.cameraImage);
         })
         .catch((err: any) => {
            reject(err);
         });
      });
   }




   /**
    *
    * Capture image from device's saved photo album and return as base64 data URI
    *
    * @public
    * @method selectImageFromSavedPhotoAlbum
    * @param imageWidth      {Number}        Numeric value for image width
    * @param imageHeight     {Number}        Numeric value for image height
    * @return {Promise}
    */
   public selectImageFromSavedPhotoAlbum(imageWidth: number,
                                         imageHeight: number): Promise<any> {
      return new Promise((resolve, reject) => {
         const imageDimensions: any  = this.calculateImageAspectRatio(imageWidth,
                                                                      imageHeight,
                                                                      this.MAX_WIDTH,
                                                                      this.MAX_HEIGHT);


         // Define image options
         const imageOptions: CameraOptions = {
             sourceType         : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
             destinationType    : this.camera.DestinationType.DATA_URL,
             mediaType          : this.camera.MediaType.PICTURE,
             quality            : 100,
             targetWidth        : imageDimensions.width,
             targetHeight       : imageDimensions.height,
             encodingType       : this.camera.EncodingType.JPEG,
             correctOrientation : true
         };

         this.camera
         .getPicture(imageOptions)
         .then((data: string) => {
            console.log('Image width: ' + imageWidth);
            console.log('Image height: ' + imageHeight);
            this.cameraImage 	= 'data:image/jpeg;base64,' + data;
            resolve(this.cameraImage);
         })
         .catch((err: any) => {
            reject(err);
         });
      });
   }


   /**
    *
    * Calculates and retains the aspect ratio for resizing an image
    *
    * @public
    * @method calculateImageAspectRatio
    * @param sourceWidth      {Number}        The width of the source image
    * @param sourceHeight     {Number}        The height of the source image
    * @param maxWidth         {Number}        The maximum permissible width of the resized image
    * @param maxHeight        {Number}        The maximum permissible height of the resized image
    * @return {any}
    */
   public calculateImageAspectRatio(sourceWidth: number,
                                    sourceHeight: number,
                                    maxWidth: number,
                                    maxHeight: number): any {

    const minVal1: number    = maxWidth / sourceWidth;
    const minVal2: number    = maxHeight / sourceHeight;
    const ratio: number 	   = Math.min(minVal1, minVal2);
    const width: number      = sourceWidth * ratio;
    const height: number     = sourceHeight * ratio;
    const ratios: any 		   = { width, height };

    console.log('Ratios are: ' + ratios.width + ' , ' + ratios.height);
    return ratios;
   }

}
