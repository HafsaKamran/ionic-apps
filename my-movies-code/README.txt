This is the base code for the my-movies project.

In order to test this code on your own environment you will need to do the following:


1. Create a new Ionic project with the following values:

   ionic start my-movies tabs --type=angular --capacitor



2. Run the following instructions from your command line (at the root of your newly created project):

   npx cap init my-movies com.saintsatplay.myMovies 
   ionic build
   npx cap ios
   npx cap android
   ionic generate service services/moviedb-api
   ionic generate service services/storage
   ionic generate service services/selected-saved-search-listener
   ionic generate service services/movies-listener
   ionic generate service services/favourite-movies
   ionic generate component components/shared-components/movie
   ionic generate component components/shared-components/movie-credits
   ionic generate component components/shared-components/saved-searches-list 
   ionic generate component components/shared-components/genres-list
   ionic generate module components/shared-components



3. Copy the code contained in the following files of this download:

   src/environments/

   And past these into - and replace - the following directory of your newly created project: 

   src/environments/


   Within both the environment.ts and environment.prod.ts files replace the value for the movieDb value with your own
   TMDB API key



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



6. Copy the code contained in the following directories of this download:

   src/app/components
   src/app/services
   src/pages
   src/tabs
   src/tab 1
   src/tab 2
   src/tab 3
   

   And paste these into the src/app directory of your newly created project 



7. Build and run your code:

    ionic build
    npx cap sync
    npx cap open android
    npx cap open ios
