# Hello Next App Docs

---

## Install

Rename the `hello-next-app` project directory to your project name. At the top level of the project directory, open a terminal window and install the dependencies.

```
npm install
```

Run the app in a local environment.

```
npm run dev
```

At this point you will see the app running, but authentication and our serverless backend functions will not work until we set up Firebase.

## Setup Firebase

First, you will need to create a new Firebase account at [firebase.google.com](https://firebase.google.com/) then create a project at the Firebase console. Under the General Settings, give your app a Public-facing name.

Get your account credentials from the Firebase console at _Project settings > Service accounts_ where you can click on Generate new private key and download the credentials as a json file. It will contain keys such as `project_id`, `client_email` and `client_id`. Set them as environment variables in the `.env` file at the root of this project.

We will also need to set up the Authentication settings for our app. In the Firebase console, go to the Authentication section for your app. Under Sign-in providers, enable 'Email/Password' and Email link (passwordless login).

Next, add a new Web App to your project.

Uncomment then set the environment variables SESSION_SECRET_CURRENT and SESSION_SECRET_PREVIOUS in the .env file. These are used by cookie-session.

Duplicate the `.env` as `.env.build` then uncomment and set the `FIREBASE_PRIVATE_KEY` var and set it to the value from the json credentials file you downloaded from Firebase (it should start with `-----BEGIN PRIVATE KEY-----` and end with `\n-----END PRIVATE KEY-----\n`).

The `.env.build` file should never enter our source control as it has private keys that should only be used in our local environment.

When it comes time for deployment, we will add these environment variables to the remote environment via the console (see the Deployment section).

Additionally, we need admin rights for our API to access our Cloud Firestore so in the Firebase console, navigate to the Service Accounts tab under Settings, and click the Generate new private key button. This will generate a json file that will be downloaded by your browser.

Find this file and move it to the `lib/firebase/admin` folder and rename it to `firebase-adminsdk.json`.

Return to the Firebase console, and under Cloud Firestore, click the Create Database button and then select the Start in test mode option. Choose a location based on proximity to where most of your users will be.

Once the database is provisioned, create a new `users` collection where you can store user data. You will be prompted to create an initial record. Click the Auto-ID option and create a plan field with a Type of String and a value of 0, then click Save. This is where we will be able to tie our authenticated users to a plan id they can sign up for.

Create another collection named `plans` where we can store data every time a user signs up for a plan. Again user the Auto-ID option and then click Save.

Initially your Firebase account will have [security rules](https://firebase.google.com/docs/firestore/security/overview) that allow open access during development. These rules will expire 30 days after you sign up for an account. You will need to [follow the directions from the Firebase docs](https://firebase.google.com/docs/firestore/security/insecure-rules) to update your security rules to to allow only signed-in users to write data.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```

## Config Files

**package.json**

This file contains the settings for npm, including various scripts for development (more on that later). For now, you can update name, description and other info in `package.json` for your project. For more information, refer to the [npm documentation about package.json](https://docs.npmjs.com/creating-a-package-json-file).

**app.config.js**

This file contains settings for your app that are used in various places in the app. Each property in the file, such as your app’s name and description, is commented with how it is used.

## Pages

For each page, define props for the url, title, description and more that are used to set meta tag data for that page. These are passed as props to the `Wrapper` component. It is recommended for SEO that you have a different title and description for each page. You may also define the background color for each page here.

## Layout Components

_/components/layout/Wrapper.js_

The contents for each page is wrapped in a top-level `Wrapper` component. The main purpose of this component is to provide the design theme to all of its child components and wrap them in a `Layout` component. This is also where Google Analytics is initialized if you have enabled it within `app.config.js`.

_/components/layout/Layout.js_

The `Layout` component builds the page structure that is shared across your app, including `Header` and `Footer` components and a `Main` component for the page content itself.

A global document head with `<title>`, `<description>`, `<meta>` tags and more can be updated by editing `src/layout/Head.js`.

If you are using Google Analytics or other services you need to embed on every page, add them to the `Wrapper` component at `src/layout/Wrapper.js`

### Routing

Refer to the [Next.js docs](https://nextjs.org/docs/basic-features/pages) for how to author pages and [set up routing](https://nextjs.org/docs/routing/introduction).

This project comes with some default routes - see the `/pages` folder. The `/app` route features a parameterized route that uses `AppContext` to switch between different color modes and share that state with different components, in this case the project’s `Main` component - see `src/views/App.js`, `src/context/AppContext.js` and `src/ui/Main.js`.

Refer to the [Next.js docs](https://nextjs.org/docs/routing/introduction) for more info about how routing works.


## Stripe Integration

To set up payment plans, sign up for a Stripe account if you do not already have one. 

After you’ve signed up for an account, you will get access to your API keys. Add these keys to your `.env.build` config file so that the Stripe API will work in your local environment

*.env.build*
```
# Stripe secret
STRIPE_PUBLIC_KEY_TEST=pk_test_A12...
STRIPE_SECRET_KEY_TEST=sk_test_B34...
STRIPE_PUBLIC_KEY=pk_test_C56...
STRIPE_SECRET_KEY=sk_test_D78...
```

The default settings in *app.config.js* are for one free and two paid monthly plans that begin with a 30-day free trial. Edit the config file to reflect the payment plans you would like to attach to your app.

In Stripe, you will need to add a product for each paid plan that you offer. To change the length of the free trial, adjust the `trial` string in *app.config.js* to correspond to your settings in Stripe.

Additionally, for every product you add to Stripe, you should add a duplicate test product.

The plan id for each product (and the test product plan id) should be added to *app.config.js*.


## User Management

Provide information here about creating a user in Firebase, then linking that user with a paid account and subscription plan in Stripe...

When a new user signs up, they first get a user account under the Firebase project so they can authenticate into your app with an email and password. 

For our Firebase database, we will have two separate areas for managing users. There is the Authentication data associated with a user that contains any data necessary for handling the authentication flow for that user. Next, there is a users collection that we can use to store other user metadata, such as what plan they have signed up for or their Stripe Customer ID.

Next up, they sign up for a plan. If the plan is free, then...

For paid accounts, the user will provide their credit card details and make a Stripe payment to create their subscription.




## Customization

### Favicon

Replace favicon.ico...

### Components

Stuff about Theme UI Components...

Additionally, this template comes with its own components like in the `/src/ui` folder that you can use, customize or throw away.

### Styling

Configure your project’s color scheme, typography and other design system values by editing the theme object in `src/layout/Theme.js`. For more info on the theme object, refer to the [System UI Theme Specification](https://system-ui.com/theme/) and the [Theme UI docs](https://theme-ui.com/theming).

Edit global styles in `src/layout/Styles.js`.

Style components using Theme UI’s [sx prop](https://theme-ui.com/sx-prop) or use its [built-in components](https://theme-ui.com/components). You can also drop in components from any [styled-system](https://styled-system.com/) compatible component framework, such as [Chakra UI](https://chakra-ui.com/). For more info, refer to the [Theme UI docs](https://theme-ui.com/theming).

### MDX

You can write long form content in markdown with [mdx](https://mdxjs.com/). For example, this project’s homepage content has been authored in markdown - see `src/markdown/Home.mdx` and these docs have been imported to `src/views/Docs.js` from the project’s top level `README.md` file.

## Tests

This project uses [Cypress](https://www.cypress.io/) for testing. Tests have been written for the landing page, docs and app.

Expand, modify or delete these tests in `cypress/integration` folder. A custom command written for testing the example App can be found in `cypress/support/commands.js`

To run tests:

```
npm run test
```

This package comes with pre-configured tests. To get them to pass, you will need to update them for your project. 


## Deployment

If you haven’t already, you will need to set up source control for the project. Create a new private github repository and commit your codebase.

We will use vercel for deployment. Create an account at [vercel.com/signup](https://vercel.com/signup) and connect it to your github account. 

Once you have your account, install the Vercel CLI:

```
npm install -g vercel
```

With that done, we can issue the `vercel` command to deploy a new project. Follow the prompts to set it up for our first deployment:

```
vercel
```

For future deployments, we can run the deploy script which will check that tests pass then push to master and deploy to production.

```
npm run deploy
```

Last, we need to add our environment variables to our deployment configuration. For every variable in our local `.env.build` file, we will need a matching environment variable to be added in the settings for our project in the Vercel console.
