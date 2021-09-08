(self["webpackChunkphoto_app"] = self["webpackChunkphoto_app"] || []).push([["src_app_home_home_module_ts"],{

/***/ 2003:
/*!*********************************************!*\
  !*** ./src/app/home/home-routing.module.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageRoutingModule": () => (/* binding */ HomePageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 9895);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 2267);




const routes = [
    {
        path: '',
        component: _home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage,
    }
];
let HomePageRoutingModule = class HomePageRoutingModule {
};
HomePageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule]
    })
], HomePageRoutingModule);



/***/ }),

/***/ 3467:
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePageModule": () => (/* binding */ HomePageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 8583);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _home_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./home.page */ 2267);
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home-routing.module */ 2003);








let HomePageModule = class HomePageModule {
};
HomePageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.ReactiveFormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _home_routing_module__WEBPACK_IMPORTED_MODULE_1__.HomePageRoutingModule
        ],
        declarations: [_home_page__WEBPACK_IMPORTED_MODULE_0__.HomePage]
    })
], HomePageModule);



/***/ }),

/***/ 2267:
/*!***********************************!*\
  !*** ./src/app/home/home.page.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HomePage": () => (/* binding */ HomePage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 4762);
/* harmony import */ var _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./home.page.html */ 9764);
/* harmony import */ var _home_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./home.page.scss */ 2610);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 7716);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @ionic/angular */ 476);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _services_pictures_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/pictures.service */ 7180);







/**
 * @ignore
 */
let HomePage = class HomePage {
    /**
     * @constructor
     * Creates an instance of HomePage.
     * @param {AlertController} alert
     * @param {LoadingController} loading
     * @param {FormBuilder} fb
     * @param {PicturesService} picture
     * @memberof HomePage
     */
    constructor(alert, loading, fb, picture) {
        this.alert = alert;
        this.loading = loading;
        this.fb = fb;
        this.picture = picture;
        /**
         * @name imageCaptured
         * @type {Boolean}
         * @public
         * @description     		Stores the state of the app - whether image has been captured or not
         */
        this.imageCaptured = false;
        this.form = fb.group({
            imageSize: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required],
            sourceType: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_3__.Validators.required]
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
    captureImageWidth(dimension) {
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
    captureImage(val) {
        this.displayPreloader();
        switch (val.sourceType) {
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
    selectImageWithCamera(width, height) {
        this.picture
            .selectImageWithCamera(width, height)
            .then((data) => {
            this.imageCaptured = true;
            this.capturedImage = data.toString();
            this.hidePreloader();
        })
            .catch((error) => {
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
    selectImageFromLibrary(width, height) {
        this.picture
            .selectImageFromLibrary(width, height)
            .then((data) => {
            this.imageCaptured = true;
            this.capturedImage = data.toString();
            this.hidePreloader();
        })
            .catch((error) => {
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
    selectImageFromSavedPhotoAlbum(width, height) {
        this.picture
            .selectImageFromSavedPhotoAlbum(width, height)
            .then((data) => {
            console.log('selectImageFromSavedPhotoAlbum');
            this.imageCaptured = true;
            this.capturedImage = data.toString();
            this.hidePreloader();
        })
            .catch((error) => {
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
    retakeImageCapture() {
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
    displayPreloader() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            this.LOADER = yield this.loading.create();
            return yield this.LOADER.present();
        });
    }
    /**
     * Hide the LoadingController component
     *
     * @private
     * @method hidePreloader
     * @return {None}
     */
    hidePreloader() {
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
    displayAlert(title, message) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__awaiter)(this, void 0, void 0, function* () {
            const headsUp = yield this.alert.create({
                header: title,
                subHeader: message,
                buttons: ['Got It!']
            });
            yield headsUp.present();
        });
    }
};
HomePage.ctorParameters = () => [
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.AlertController },
    { type: _ionic_angular__WEBPACK_IMPORTED_MODULE_5__.LoadingController },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_3__.FormBuilder },
    { type: _services_pictures_service__WEBPACK_IMPORTED_MODULE_2__.PicturesService }
];
HomePage = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.Component)({
        selector: 'app-home',
        template: _raw_loader_home_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_home_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], HomePage);



/***/ }),

/***/ 2610:
/*!*************************************!*\
  !*** ./src/app/home/home.page.scss ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("#container {\n  text-align: center;\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 50%;\n  transform: translateY(-50%);\n}\n\n#container strong {\n  font-size: 20px;\n  line-height: 26px;\n}\n\n#container p {\n  font-size: 16px;\n  line-height: 22px;\n  color: #8c8c8c;\n  margin: 0;\n}\n\n#container a {\n  text-decoration: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvbWUucGFnZS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usa0JBQUE7RUFFQSxrQkFBQTtFQUNBLE9BQUE7RUFDQSxRQUFBO0VBQ0EsUUFBQTtFQUNBLDJCQUFBO0FBQUY7O0FBR0E7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7QUFBRjs7QUFHQTtFQUNFLGVBQUE7RUFDQSxpQkFBQTtFQUVBLGNBQUE7RUFFQSxTQUFBO0FBRkY7O0FBS0E7RUFDRSxxQkFBQTtBQUZGIiwiZmlsZSI6ImhvbWUucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiI2NvbnRhaW5lciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcblxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xufVxuXG4jY29udGFpbmVyIHN0cm9uZyB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbiAgbGluZS1oZWlnaHQ6IDI2cHg7XG59XG5cbiNjb250YWluZXIgcCB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgbGluZS1oZWlnaHQ6IDIycHg7XG5cbiAgY29sb3I6ICM4YzhjOGM7XG5cbiAgbWFyZ2luOiAwO1xufVxuXG4jY29udGFpbmVyIGEge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG59Il19 */");

/***/ }),

/***/ 9764:
/*!***************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/home/home.page.html ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-header [translucent]=\"true\">\n  <ion-toolbar>\n    <ion-title>\n      Ionic Image Capture\n    </ion-title>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content [fullscreen]=\"true\">\n\n  <form *ngIf=\"!imageCaptured\"\n    [formGroup]=\"form\">\n    <ion-list>\n\t\n\n      <ion-item margin-bottom>\n      <ion-label>Source Type</ion-label>\n      <ion-select formControlName=\"sourceType\">\n          <ion-select-option value=\"0\">Photolibrary</ion-select-option>\n          <ion-select-option value=\"1\">Camera</ion-select-option>\n          <ion-select-option value=\"2\">Saved Photoalbum</ion-select-option>\n      </ion-select>\n      </ion-item>\n\n\n      <ion-item margin-bottom> \n        <ion-label text-left>Image Width</ion-label>\n        <ion-range \n          formControlName=\"imageSize\" \n          min=\"100\" \n          max=\"500\" \n          step=\"100\" \n          snaps=\"true\" \n          secondary \n          (ionChange)=\"captureImageWidth(form.controls['imageSize'])\">\n          <ion-label slot=\"start\">100</ion-label>\n            <ion-label slot=\"end\">500</ion-label>\n        </ion-range>\t\t \t\n      </ion-item>\n\n\n      <ion-button\n        color=\"primary\" \n        text-center \n        expand=\"full\" \n        [disabled]=\"!form.valid\" \n        (click)=\"captureImage(form.value)\">Capture Image</ion-button>\n    </ion-list>\n   </form>\n\n   \n   <div *ngIf=\"imageCaptured\">\n   \t  <p>Returned image:</p>\n   \t  <img [src]=\"capturedImage\">\n   \t  <ion-button color=\"primary\" text-center (click)=\"retakeImageCapture()\">Back</ion-button>\n   </div>\n\n\n</ion-content>\n");

/***/ })

}]);
//# sourceMappingURL=src_app_home_home_module_ts.js.map