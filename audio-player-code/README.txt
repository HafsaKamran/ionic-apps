This is the base code for the audio-player project.

In order to test this code on your own environment you will need to do the following:


1. Create a new Ionic project with the following values:

   ionic start audio-player blank --type=angular --capacitor



2. Run the following instructions from your command line (at the root of your newly created project):

   npx cap init audio-player com.saintsatplay.audioPlayer
   ionic build
   ionic generate service services/sound-manager
   npm install @capacitor-community/electron --save-dev 
   npx cap add @capacitor-community/electron



3. Create a sub-directory named tracks in the following location of your newly created project:

   audio-player/src/assets/

  
   Paste your downloaded MP3 tracks from https://freemusicarchive.org into this tracks sub-directory



4. Copy the code contained in the following files of this download:

   src/pages/home/home.ts
   src/pages/home/home.scss
   src/pages/home/home.html

   And use this to replace the code contained in the following files of your newly created project: 

   src/pages/home/home.ts
   src/pages/home/home.scss
   src/pages/home/home.html 



5. Copy the code contained in the following directories of this download:

   src/app/services
   

   And paste this into the src/app directory of your newly created project 



6. Copy the code contained in the following files of this download:

   src/app/app.module.ts

   And use this to replace the code contained in the following files of your newly created project: 

   src/app/app.module.ts



7. Copy the code contained in the following files of this download:

   src/theme/

   And past these into - and replace - the following directory of your newly created project: 

   src/theme/



8. Build and run your code:

    ionic build
    npx cap sync
    npx cap open @capacitor-community/electron
