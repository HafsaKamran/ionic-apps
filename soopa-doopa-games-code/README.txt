This is the base code for the soopa-doopa-games project.

In order to test this code on your own environment you will need to do the following:

1. Create a new Ionic project with the following values:

   ionic start soopa-doopa-games blank --type=angular



2. Edit the widget id field of the config.xml file of your newly created project and provide a reverse 
   domain name identifier of your choice for the application - I.e. com.yourOrganisationName.sooperdoopergames

   Also edit the name field of the config.xml file of your newly created project and supply the following value:

   SoopaDoopa



3. Add the necessary platforms:

   ionic cordova platform add ios
   ionic cordova platform add android



4. Install the required plugins:

   ionic cordova plugin add cordova-plugin-inapppurchase
   npm install --save @ionic-native/in-app-purchase

   ionic cordova plugin add cordova-sqlite-storage
   npm install --save @ionic-native/sqlite



5. Copy the code contained in the following files of this download:

   src/home/home.ts
   src/home/home.scss
   src/home/home.html

   And use this to replace the code contained in the following files of your newly created project: 

   src/home/home.ts
   src/home/home.scss
   src/home/home.html 



6. Copy the code contained in the following files of this download:

   src/app/app.scss
   src/theme/variables.scss

   Use these to replace the code in each of their associated files of your newly created project: 

   src/app/app.scss
   src/theme/variables.scss



7. Copy the following directories of this download:

   src/app/pages/alpha-male
   src/app/pages/climate-hero
   src/app/pages/grand-theft-noughto
   src/app/pages/happy-families
   src/app/pages/king-for-a-day
   src/app/pages/world-traveller

   And paste these directories into the following directory of your newly created project: 

   src/app/



8. Create the following providers in your newly created project:

   ionic g provider database
   ionic g provider utilities


   Then copy the code from the following file of this download:

   src/services/database.ts
   src/services/utilities.ts

   And paste into (replacing) their related counterparts of your newly created project:

   src/services/database.ts
   src/services/utilities.ts


9. You will need to create an application listing for this project with the Google Play and Apple App Stores.



10. In each app store record for the application the following In-app Products (as defined within the src/pages/home/home.ts 
   file) will need to be created as non-consumable products:

   com.saintsatplay.happyfamilies
   com.saintsatplay.climatehero
   com.saintsatplay.alphamale
   com.saintsatplay.grandtheftnoughto
   com.saintsatplay.worldtraveller
   com.saintsatplay.kingforaday

   * You WILL want to substitute saintsatplay for whatever your organisation name is :)
                 
   You can test these In-app Products, once created, on iOS by simply creating a build file and running that on your device.
   On Android you will need to generate a codesigned APK file and upload this to the Google Play Store before 
   you can test the In-app Products



11. You will need to add the following configuration to your src/manifest.json file IF you are using In-app Products with Android:

    "play_store_key": "PASTE-YOUR-IN-APP-BILLING-KEY-FROM-GOOGLE-PLAY-HERE"


    Be sure to replace the placeholder value with the In-app Billing Key for the application (which you will be able to access
    through your Google Play developer account)



12. Copy images from the following directory from this download:

   src/assets/images

   And paste these into the same directory of your newly created project

   src/assets/images



13. Copy the following resources from this download:

   resources/android/icon.png
   resources/android/splash.png
   resources/ios/icon.png
   resources/ios/splash.png

   And paste into the same directories in your newly created project



14. To generate the application's custom splash screens and lauch icons simply run the following from the command line:

    ionic cordova resources



15. If using Xcode you will need to open your newly created project and assign a team and 
    provisioning profile for the project in the Signing section 



16. Type out the following to build and run your code:

   ionic cordova build ios —-prod
   ionic cordova run ios

   ionic cordova build android —-prod
   ionic cordova run android