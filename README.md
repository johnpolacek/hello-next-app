# Hello Next App

----

## From Zero to Production

Hello Next App is a Next.js Starter Project to get you up and running in production quickly with Firebase Authentication, Cloud Firestore Database, Serverless Edge Functions, Playwright Testing, Vercel and more.

## Setting Up the Project

To bootstrap the app, run the following command and answer the prompts:

```
npx create-hello-next-app
```

This will create project in a new directory and install the dependencies.

You will need to create a new Firebase project.

Go to the [Firebase console](https://console.firebase.google.com/) and add your project by following the prompts. Once you’re project is created, set up Firebase Authentication and enable Email/Password initially as an authentication provider to get started. 

If you’d like to use Google as an Authentication Provider, you will need to provide a Google Support Email Address. You will need a google email address. If you would like to have a dedicated email address for support, you can set one up on [groups.google.com](https://groups.google.com/). You will also need to add your production domain to Authorized Domains under Authentication Settings.

To use Firebase, you will need to copy the config into your codebase. Go to your Firebase project dashboard, click on the gear icon, and choose "Project settings"

Under "Your apps," click on the "</>" icon to create a new web app, and follow the prompts. After creating the app, copy the Firebase config object. Use those values to replace the ones in `/src/lib/firebase/config.ts`.

Next, you will need to create the `.env` variables for the Firebase Admin SDK. In your Firebase project console, go to Project Settings then the Service Accounts tab. Click the ‘Generate new private key’ button then download the JSON file. 

Rename the `.env.example` file to `.env` then replace the values with the corresponding properties in the Firebase Admin SDK json file.


## Local Environment

To run locally, do:

```
npm run dev
```

To run tests, do `npm run test` or `npm run test-watch`.


## Deploy to Vercel

Sign up for Vercel and link your project on Github. When you push your code, it should deploy to Vercel. 

You will need to set environment variables on your project with the values from your local `.env` file. You will also need to add your production domain to the list of Authorized Domains under your Firebase Project’s Authentication settings.

You will also need to add the same environment variables to the "Settings" tab in your GitHub repository for them to be available to the CI test runner.



