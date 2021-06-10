This is the base code for the food-api project.

In order to test this code on your own environment you will need to do the following:



1. Create a new Ionic project with the following values:

   ionic start food-api blank --type=angular



2. Copy the code contained in the following files of this download:

   src/app/home/
   src/app/services/

   And past these into (and replace where required) the following directory of your newly created project: 

   src/app/



3. Copy the code contained in the following files of this download:

   src/environments/

   And past these into - and replace - the following directory of your newly created project: 

   src/environments/


   Within both the environment.ts and environment.prod.ts files replace the value for the spoonacular key with
   your own generated spoonacular API key value



4. Copy the code contained in the following files of this download:

   src/app/app.module.ts

   And use this to replace the code contained in the following files of your newly created project: 

   src/app/app.module.ts



5. Preview in the browser with the following command:

   ionic serve
