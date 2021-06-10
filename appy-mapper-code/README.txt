This is the base code for the appy-mapper project.

In order to test this code on your own environment you will need to do the following:


1. Create a new Ionic project with the following values:

   ionic start appy-mapper blank --type=angular --capacitor



2. Run the following instructions from your command line (at the root of your newly created project):

   npx cap init appy-mapper com.saintsatplay.appyMapper ionic build
   npx cap ios
   npx cap android
   npm install --save leaflet @asymmetrik/ngx-leaflet npm install --save-dev @types/leaflet
   npm install --save @ionic/storage
   ionic generate service services/distances
   ionic generate service services/manager
   ionic generate service services/places
   ionic generate service services/storage
   ionic generate interface interfaces/countries
   ionic generate interface interfaces/locations
   ionic generate interface interfaces/store



3. Copy the code contained in the following files of this download:

   src/environments/

   And past these into - and replace - the following directory of your newly created project: 

   src/environments/


   Within both the environment.ts and environment.prod.ts files replace the value for the Mapbox map token with your own
   generated Mapbox account token



4. Copy the code contained in the following files of this download:

   src/app/app.module.ts

   And use this to replace the code contained in the following files of your newly created project: 

   src/app/app.module.ts



5. Copy the code contained in the following files of this download:

   src/pages/home/home.ts
   src/pages/home/home.scss
   src/pages/home/home.html

   And use this to replace the code contained in the following files of your newly created project: 

   src/pages/home/home.ts
   src/pages/home/home.scss
   src/pages/home/home.html 



6. Within your application's angular.json file add the following configuration into the styles array:

   {
     "input": "node_modules/leaflet/dist/leaflet.css"
   }



7. Copy the following files from your project's node_modules/leaflet/dist/images/ directory:

   • marker-icon.png
   • marker-shadow.png

   Within your project's src/assets directory create a sub-directory named leaflet and paste these file into there



8. Copy the following files from the src/assets directory of this download:

   • countries.json
   • locations.json

   And paste these into the following directory of your newly created project: 

   src/assets/



9. Copy the code contained in the following files of this download:

   src/app/home/

   And use this to replace the code contained in the following directory of your newly created project: 

   src/app/home/



10. Copy the code contained in the following files of this download:

    src/app/interfaces/

    And use this to replace the code contained in the following directory of your newly created project: 

    src/app/interfaces/



11. Copy the code contained in the following files of this download:

    src/app/services/

    And use this to replace the code contained in the following directory of your newly created project: 

    src/app/services/



12. Copy the following resources from this download:

    resources/android/icon.png
    resources/android/splash.png
    resources/ios/icon.png
    resources/ios/splash.png
 
    And paste into the same directories in your newly created project



13. To generate the application's custom splash screens and lauch icons simply run the following from the command line:

    cordova-res ios --skip-config --copy
    cordova-res android --skip-config --copy



14. Build and run your code:

    ionic build
    npx cap sync
    npx cap open android
    npx cap open ios
