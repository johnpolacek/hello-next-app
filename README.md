WIP:
Setting up hello-next-app Firebase project

---

#Hello Next App

## Next.js Web App Project Template


- Next.js Framework
- Serverless Firebase API
- Chakra UI Components
- MDX Authoring
- Cypress Testing
- Now Deployments

## Setup

First, you will need to create a new Firebase account at [firebase.google.com](https://firebase.google.com/) then create a project at the Firebase console.

Get your account credentials from the Firebase console at Project settings > Service accounts, where you can click on Generate new private key and download the credentials as a json file. It will contain keys such as project_id, client_email and client_id. Set them as environment variables in the .env file at the root of this project.

Set the environment variables SESSION_SECRET_CURRENT and SESSION_SECRET_PREVIOUS in the .env file. These are used by cookie-session.

Duplicate the `.env` as `.env.build` and add the `FIREBASE_PRIVATE_KEY` var and set it to the value from the json credentials file you downloaded from Firebase (tt should start with `-----BEGIN PRIVATE KEY-----` and end with `\n-----END PRIVATE KEY-----\n`).

## Deployment

For deployment to `now`, you will need to get a zeit.co account at [zeit.co/signup](https://zeit.co/signup). Once you have an account, you will need to install the Now CLI:

```
npm install -g now
```

Next, we will use the Now CLI to add the secret vars for Firebase that correspond our local `.env`. *Note that for the multiline private key, you will need the `--` modifier and to enclose the value in quotes.*

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


