# Hello Next App

----

## From Zero to Production

Hello Next App is a Next.js Starter Project to get you up and running in production quickly with Firebase Authentication, Cloud Firestore Database, Serverless Edge Functions, Playwright Testing and more.

## Setting Up the Project

To bootstrap the app, run the following command and answer the prompts:

```
npx create-hello-next-app
```

This will create project in a new directory and install the dependencies.

You will need to create a new Firebase project.

Go to the [Firebase console](https://console.firebase.google.com/) and add your project by following the prompts. Once you’re project is created, set up Firebase Authentication and enable Email/Password initially as an authentication provider to get started.

To use Firebase, you will need to copy the config into your codebase. Go to your Firebase project dashboard, click on the gear icon, and choose "Project settings"

Under "Your apps," click on the "</>" icon to create a new web app, and follow the prompts. After creating the app, copy the Firebase config object. Use those values to replace the ones in `/src/lib/firebase/config.ts`.

Next, you will need to create the `.env` variables for the Firebase Admin SDK. In your Firebase project console, go to Project Settings then the Service Accounts tab. Click the ‘Generate new private key’ button then download the JSON file. 

Rename the `.env.example` file to `.env` then replace the values with the corresponding properties in the Firebase Admin SDK json file.

To run locally, do:

```
npm run dev
```

To deploy, you will need to add secrets for the environment variables from your `.env` to the server. 

To run tests, do `npm run test` or `npm run test-watch`.