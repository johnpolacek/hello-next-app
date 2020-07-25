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

The `.env-build` file should never enter our source control as it has private keys that should only be used in our local environment.

When it comes time for deployment, we will add these environment variables to the remote environment via the console (see the Deployment section).

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

API Keys...

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

For deployment to `now`, you will need to get a zeit.co account at [zeit.co/signup](https://zeit.co/signup). Once you have an account, you will need to install the Now CLI:

```
npm install -g now
```

Next, we will use the Now CLI to add the secret vars for Firebase that correspond our local `.env`. _Note that for the multiline private key, you will need the `--` modifier and to enclose the value in quotes._

For the `session-secret-previous` and `session-secret-current` variables, generate your own random 32-character key unique to your app.

```
now secrets add session-secret-previous <secret-value>
now secrets add session-secret-current <secret-value>
now secrets add firebase-public-api-key <secret-value>
now secrets add firebase-project-id <secret-value>
now secrets add firebase-database-url <secret-value>
now secrets add firebase-client-email <secret-value>
now secrets add firebase-auth-domain <secret-value>
now secrets add firebase-private-key -- "<secret-value>"
```

Now that we have stored these to our zeit account, we need to create a `now.json` deployment config file in our root directory so that the environment can access them.

```
{
  "env": {
    "FIREBASE_PUBLIC_API_KEY": "@firebase-public-api-key",
    "FIREBASE_AUTH_DOMAIN": "@firebase-auth-domain",
    "FIREBASE_DATABASE_URL": "@firebase-database-url",
    "FIREBASE_PROJECT_ID": "@firebase-project-id",
    "FIREBASE_CLIENT_EMAIL": "@firebase-client-email",
    "SESSION_SECRET_CURRENT": "@session-secret-current",
    "SESSION_SECRET_PREVIOUS": "@session-secret-previous"
  },
  "build": {
    "env": {
      "FIREBASE_PUBLIC_API_KEY": "@firebase-public-api-key",
      "FIREBASE_AUTH_DOMAIN": "@firebase-auth-domain",
      "FIREBASE_DATABASE_URL": "@firebase-database-url",
      "FIREBASE_PROJECT_ID": "@firebase-project-id",
      "FIREBASE_CLIENT_EMAIL": "@firebase-client-email",
      "FIREBASE_PRIVATE_KEY": "@firebase-private-key",
      "SESSION_SECRET_CURRENT": "@session-secret-current",
      "SESSION_SECRET_PREVIOUS": "@session-secret-previous"
    }
  }
}
```

With that done, we can issue the `now` command from the Now CLI. This is a new project (not existing) in `zeit` so we will follow the prompts to set it up for our first deployment:

```
now
```

For future deployments, we can run the deploy script which will check that tests pass then push to master and deploy to production.

```
npm run deploy
```
