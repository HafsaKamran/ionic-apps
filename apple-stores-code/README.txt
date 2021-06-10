This is the base code for the apple-stores project.

In order to test this code on your own environment you will need to do the following:



1. Create a new Ionic project with the following values:

   ionic start apple-stores blank --type=angular



2. Copy the following directories from the project download:

   src/app/home
   src/app/interfaces
   src/app/services

   And paste these into the following directory of your newly created project (and replace the existing home directory): 

   src/app/



3. Copy the following directory from the project download:

   src/assets/data

   And paste this into the following directory of your newly created project: 

   src/assets/



4. Open the movies-app/src/app/app.module.ts file and add the following import:

   import { HttpClientModule } from '@angular/common/http';

   
   Within the @NgModule imports array add the following configuration:

   HttpClientModule



5. Preview in the browser with the following command:

   ionic serve


