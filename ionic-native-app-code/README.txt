This is the base code for the photo-app project.

In order to test this code on your own environment you will need to do the following:

1. Create a new Ionic project with the following values:

   ionic start photo-app blank --type=angular


2. Add the necessary platforms:

   ionic cordova platform add ios
   ionic cordova platform add android


3. Install the required plugins:

   ionic cordova plugin add cordova-plugin-camera
   npm install --save @ionic-native/camera  



4. Create the following service:

   ionic g service services/pictures

   Then copy the code from the following file of this download:

   src/app/services/pictures.service.ts

   And paste into (replacing) their related counterparts of your newly created project:

   src/app/services/pictures.service.ts



5. Copy the code contained in the following files of this download:

   src/app/home/home.page.ts
   src/app/home/home.module.ts
   src/app/home/home.page.html

   And use this to replace the code contained in the following files of your newly created project: 

   src/app/home/home.page.ts
   src/app/home/home.module.ts
   src/app/home/home.page.html 



6. Copy the config.xml file from this download:

   config.xml

   And paste this directory into the root directory of your newly created project



7. Ensure the code in the src/app/app.module.ts file of your newly created project resembles the following:

    import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
    import { HttpClientModule } from '@angular/common/http';
    import { BrowserModule } from '@angular/platform-browser';
    import { RouterModule, RouteReuseStrategy, Routes } from '@angular/router';

    import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
    import { SplashScreen } from '@ionic-native/splash-screen/ngx';
    import { StatusBar } from '@ionic-native/status-bar/ngx';
    import { Camera } from '@ionic-native/camera/ngx';

    import { AppComponent } from './app.component';
    import { AppRoutingModule } from './app-routing.module'; 
    import { PicturesService } from './services/pictures.service';


    @NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule, 
        HttpClientModule,
        IonicModule.forRoot(), 
        LeafletModule.forRoot(),
        AppRoutingModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [
        StatusBar,
        SplashScreen, 
        Camera,
        PicturesService,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    ],
    bootstrap: [AppComponent]
    })
    export class AppModule {}



8. Build and run your code:

   ionic cordova build ios —prod
   ionic cordova run ios

   ionic cordova build android —prod
   ionic cordova run android