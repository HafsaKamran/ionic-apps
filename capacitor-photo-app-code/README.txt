This is the base code for the photo-app project.

In order to test this code on your own environment you will need to do the following:

1. Create a new Ionic project with the following values:

   ionic start photo-app blank --type=angular --capacitor


2. Run the following commands (Mac oriented):

    npx cap init photosApp com.masteringIonic.photos ionic build
    npx cap add android
    sudo gem install cocoapods
    npx cap add ios
    npm install @ionic/pwa-elements --save 



3. Create the following service:

   ionic g service services/pictures

   Then copy the code from the following file of this download:

   src/app/services/pictures.service.ts

   And paste into (replacing) their related counterparts of your newly created project:

   src/app/services/pictures.service.ts



4. Copy the code contained in the following files of this download:

   src/app/home/home.page.ts
   src/app/home/home.module.ts
   src/app/home/home.page.html

   And use this to replace the code contained in the following files of your newly created project: 

   src/app/home/home.page.ts
   src/app/home/home.module.ts
   src/app/home/home.page.html 



5. Build and run your code:

   ionic build
   npx cap sync
   npx cap open android
   npx cap open ios