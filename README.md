WIP

- Make Form Wrapper component and any other ones to keep it DRY
- Require Terms and Conditions
- Create Terms and Privacy Policy Pages

---

##To Do

Separate Marketing Site and SaaS App Template:  
hellonextapp.com / app.hellonextapp.com

### App Template

- Model after [this example](https://demo.themesberg.com/rocket/pages/index.html) - Other Examples - [Example 1](https://5studios.net/themes/dashcore/saas.html) - [Example 2](https://themes.3rdwavemedia.com/startup-kit/bs4/4.1/) - [Example 3](https://vivaco.com/demo/startuply/index-main.html)

#### Header

- Left Side - Logo Home - About - Docs

- Right Side - Signed Out: Sign In / Sign Up - Signed In: Sign Out / Account

#### Main

Displays page content

- Landing Page - Headline and subhead - Main Buttons - Start Free Trial (sign up link) - Take Tour (video link) - Features - Pricing

- Sign In Page
- Sign Up Page
- Add Credit Card
- Reset password page
- Account page
- About page
- Tour Page
- Docs page
- Pricing page
- App View _(replaces landing page)_ - Collect Feedback from prospects?

#### Footer

- Page links - About - Pricing - Docs - Sign Up / Sign Out
- Social links
- Legal links - Privacy - Terms of Service

### Marketing Site

- Landing Page with Buy Now/Preview - [Example](https://thetheme.io/thesaas/)

<br>

---

---

#Hello Next App

## Next.js Web App Project Template

- Next.js Framework
- Serverless Firebase API
- Theme UI Components
- MDX Authoring
- Cypress Testing
- Now Deployments

## Setup

### Firebase

First, you will need to create a new Firebase account at [firebase.google.com](https://firebase.google.com/) then create a project at the Firebase console. Under the General Settings, give your app a Public-facing name.

Get your account credentials from the Firebase console at Project settings > Service accounts, where you can click on Generate new private key and download the credentials as a json file. It will contain keys such as project_id, client_email and client_id. Set them as environment variables in the .env file at the root of this project.

We will also need to set up the Authentication settings for our app. In the Firebase console, go to the Authentication section for your app. Under Sign-in providers, enable 'Email/Password' and Email link (passwordless login).

Next, add a new Web App to your project.

Set the environment variables SESSION_SECRET_CURRENT and SESSION_SECRET_PREVIOUS in the .env file. These are used by cookie-session.

Duplicate the `.env` as `.env.build` and add the `FIREBASE_PRIVATE_KEY` var and set it to the value from the json credentials file you downloaded from Firebase (tt should start with `-----BEGIN PRIVATE KEY-----` and end with `\n-----END PRIVATE KEY-----\n`).

### Install

Rename the `hello-next-app` project directory to your project name. At the top level of the project directory, open a terminal window and install the dependencies.

```
npm install
```

Run the app in a local environment.

```
npm run dev
```

## Project Structure

Each page contains a `Layout` component with the `Header` and `Footer` components and a `Main` component for the page content itself. The `Layout` component accepts props for the url, title, description and more that are used to set meta tag data on each page - see `src/layout/Wrapper.js`.

Update `package.json` with info for your own project’s name and other info.

A global document head with `<title>`, `<description>`, `<meta>` tags and more can be updated by editing `src/layout/Head.js`.

If you are using Google Analytics or other services you need to embed on every page, add them to the `Wrapper` component at `src/layout/Wrapper.js`

### Routing

Refer to the [Next.js docs](https://nextjs.org/docs/basic-features/pages) for how to author pages and [set up routing](https://nextjs.org/docs/routing/introduction).

This project comes with some default routes - see the `/pages` folder. The `/app` route features a parameterized route that uses `AppContext` to switch between different color modes and share that state with different components, in this case the project’s `Main` component - see `src/views/App.js`, `src/context/AppContext.js` and `src/ui/Main.js`.

Refer to the [Next.js docs](https://nextjs.org/docs/routing/introduction) for more info about how routing works.

## Customization

### App Config

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

## Deployment

For deployment to `now`, you will need to get a zeit.co account at [zeit.co/signup](https://zeit.co/signup). Once you have an account, you will need to install the Now CLI:

```
npm install -g now
```

Next, we will use the Now CLI to add the secret vars for Firebase that correspond our local `.env`. _Note that for the multiline private key, you will need the `--` modifier and to enclose the value in quotes._

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
