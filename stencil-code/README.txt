This is the base code for the stencil project.

In order to test this code on your own environment you will need to do the following:



1. Create a new Stencil project:

   npm init stencil


   Select component from the displayed CLI options



2. Generate the following Stencil components:

   npx stencil generate image-component
   npx stencil generate image-gallery-component



3. Copy the following directories from the project download:

   image-component
   image-gallery-component

   And paste these into the following directory of your newly created project (and replace the existing files): 

   src/components/



4. Amend the name, version and description fields of your Stencil package.json file to the following:

   "name": "stencil-gallery-YOUR-UNIQUE-IDENTIFIER-HERE",
   "version": "1.0.0",
   "description": "Stencil generated web components for creating a simple image gallery"


   Replace the YOUR-UNIQUE-IDENTIFIER-HERE placeholder with your own value



5. Run an npm run build --prod to publish your stencil components



6. Copy the following published files/directories:

   • dist/
   • loader/
   • package.json
   • readme.md

   Edit the readme.md file to whatever you wish to use to describe this component.

   Edit the copied package.json file and remove the scripts configuration block.

   Paste these generated files/directories into a new directory titled stencil-gallery-YOUR-UNIQUE-IDENTIFIER-HERE

   Replace the YOUR-UNIQUE-IDENTIFIER-HERE placeholder with your own value



7. Run npm publish to publish this stencil component as an npm package on your own npm account



8. Create a new Ionic project (decide upon a name and project type of your own choice)



9. Within this newly created ionic project run the following command (replacing the YOUR-UNIQUE-IDENTIFIER-HERE placeholder
   with your actual value that was used to name the npm package in step 4):

   npm install stencil-gallery-YOUR-UNIQUE-IDENTIFIER-HERE



10. Open your Ionic project's src/main.ts file and add the following import:

    import { defineCustomElements } from 'stencil-gallery/loader';

    
    At the bottom of this file paste the following method:

    defineCustomElements();



11. Within your Ionic project's src/app/home/home.module.ts feature module add the following import:

    import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


    And within the @NgModule declaration add the following configuration:

    schemas: [CUSTOM_ELEMENTS_SCHEMA]



12. Within your Ionic project's src/app/home/home.page.html view template file add the following custom Stencil component within the <body> tag:

    <mi-gallery></mi-gallery>



13. Preview in the browser with the following command:

   ionic serve