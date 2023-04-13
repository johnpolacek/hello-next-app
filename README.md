# Hello Next App

----

## From Zero to Production

Starting from nothing, we'll go through the process of creating a production-ready web application, integrating Firebase Authentication and Playwright for end-to-end testing.

- **tRPC**: A cutting-edge framework for building typesafe APIs, offering:
  - End-to-end typing
  - Streamlined API calls
  - Enhanced developer experience
  - [trpc.io](https://trpc.io/)

- **Next.js**: A widely used React framework that simplifies building server-rendered applications, boasting features such as:
  - Hybrid static and server rendering
  - TypeScript support
  - Intelligent bundling
  - Route pre-fetching
  - [nextjs.org](https://nextjs.org/)

- **Cloud Firestore**: A flexible and scalable NoSQL cloud database provided by Firebase, designed for:
  - Storing and syncing data
  - Client- and server-side development
  - [firebase.google.com](https://firebase.google.com/)


## Setting Up the Project

Open a CLI in a directory where you keep your projects. Then we will use [Create Next App](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) to bootstrap our project. Use the following command, choose a name for your project and accept all the defaults:

```
npx create-next-app@latest
```

As of this writing, it will give you the following dependencies:

- TypeScript
- ESLint
- React / Next.js
- Tailwind / React

We want to maintain code formatting, so we will be using Prettier.

```
npm install --save-dev prettier eslint-plugin-prettier eslint-config-prettier
```

Then you have to update your ESLint configuration by opening the `.eslintrc.json` file (if it doesn't exist, create it in the root of your project) and update the configuration to include the [Prettier](https://prettier.io/) plugin and configuration:

```
{
  "extends": [
    "next",
    "next/core-web-vitals",
    "plugin:prettier/recommended"
  ],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error"
  }
}
```

You can additionally create a `.prettierrc` file in the root of your project with your preferred Prettier settings and set up your editor to format on save.

With that done, you can run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see a basic landing page with some content about Next.js. 

## Application Shell

We can quickly set up a UI layout for our application.

First, let’s clear out all the cruft on the homepage.

```
// src/pages/index.tsx
export default function Home() {
  return <div className="flex items-center justify-center py-16">HOME</div>;
}
```

Next, let’s clear out the global styles in `src/styles/globals.css` so we have only the default tailwind imports: 

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

And a quick change to add some styling to our Custom Document:

```
// src/pages/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="h-full bg-white">
      <Head />
      <body className="h-full bg-[#fafafa]">
      ...
```

Now, let's make a `Layout` component with a simple placeholder `Header`.

```
// src/components/ui/Layout.tsx
import React from "react";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div>
    <Header />
    <main>{children}</main>
  </div>
);

export default Layout;
```
```
// src/components/ui/Header.tsx
export default function Header() {
  return (
    <header className="flex px-16 py-8 bg-white w-full">
      <div>LOGO</div>
      <nav className="flex flex-1 justify-end">Sign In</nav>
    </header>
  );
}
```

Last, we want to make some updates our Custom App:

```
// src/pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/ui/Layout";
import Head from "next/head";
import appConfig from "@/app.config";

interface OpenGraphDataItem {
  property?: string;
  name?: string;
  content: string;
}

const defaultOpenGraphData = [
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: appConfig.name },
  { property: "og:description", content: appConfig.description },
  { property: "og:title", content: appConfig.name },
  { property: "og:image", content: appConfig.image },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: appConfig.name },
  { name: "twitter:description", content: appConfig.description },
  { name: "twitter:image", content: appConfig.image },
];

export default function App({ Component, pageProps }: AppProps) {
  const {
    openGraphData = defaultOpenGraphData,
    title,
    description,
  } = pageProps;
  return (
    <>
      {openGraphData.length > 0 && (
        <Head>
          <title>{title || appConfig.name}</title>
          <meta
            name="description"
            content={description || appConfig.description}
          />
          {openGraphData.map((og: OpenGraphDataItem) => (
            <meta key={og.property || og.name} {...og} />
          ))}
        </Head>
      )}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
```

The updates above include the following features:

- Importing the global CSS file.
- Wrapping the Component with the Layout component.
- Defining default Open Graph data. Create a new `app.config.ts` file to contain a name, description and image (usually a screenshot) for your app.
- Use Next.js <Head> to set the page title, description, and Open Graph data based on pageProps or default values.

With this setup, our application will have a consistent layout across pages and include default Open Graph data for better social media sharing. The Layout component will be applied to all pages, and the global CSS styles will be available throughout the application.

## Auth

Signing up for an account is one of the first steps for people using a web application. We will be implementing authentication with Firebase Auth.

First, you need to create a Firebase project:

Go to the Firebase console and add your project by following the prompts. Once youre project is created, set up Firebase Authentication and enable Email/Password initially as an authentication provider to get started.

To use Firebase, you will need to copy the config into your codebase. Go to your Firebase project dashboard, click on the gear icon, and choose "Project settings"

Under "Your apps," click on the "</>" icon to create a new web app, and follow the prompts. After creating the app, copy the Firebase config object. 

Create a `/lib` directory to use with third-party integrations and put a `firebase` folder in there with your config file.

```
// src/lib/firebase/config.ts
export const firebaseConfig = {
  apiKey: "...",
  authDomain: "...firebaseapp.com",
  databaseURL: "https://...firebaseio.com",
  projectId: "...",
  storageBucket: "...appspot.com",
  messagingSenderId: "...",
  appId: "..."
};
```

Next, install the dependencies:

```
npm i firebase firebase-admin
```

To allow for people to sign up and sign in, we will create a module that imports Firebase and initializes the app with the config object.

```
// src/lib/firebase/client/auth.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "../config";

try {
  initializeApp(firebaseConfig);
} catch (error) {
  // firebase is already initialized
}
export const auth = getAuth();

```

Next we will create a global context to manage auth state in our app.

```
// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signOut as signOutUser,
  updateProfile,
  updatePassword,
} from "firebase/auth";
import { auth } from "../lib/firebase/client/auth";
import appConfig from "@/app.config";

export interface UserType {
  email: string | null;
  uid: string | null;
  displayName: string | null;
}

const AuthContext = createContext({});

export const useAuth = () => useContext<any>(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType>({
    email: null,
    uid: null,
    displayName: null,
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
        });
        setLoading(false);
      } else {
        setUser({ email: null, uid: null, displayName: null });
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    console.log({
      email,
      password,
      displayName,
    });
    return updateProfile(result.user, {
      displayName,
    });
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const isSignInWithLink = async (emailLink: string) => {
    const result = await isSignInWithEmailLink(auth, emailLink);
    return result;
  };

  const signInWithLink = async (email: string, emailLink: string) => {
    const result = await signInWithEmailLink(auth, email, emailLink);
    return result;
  };

  const signOut = async () => {
    setUser({ email: null, uid: null, displayName: null });
    await signOutUser(auth);
  };

  const setNewPassword = async (password: string) => {
    if (auth.currentUser) {
      return updatePassword(auth.currentUser, password);
    } else {
      return { error: "Current User not found" };
    }
  };

  const requestPasswordReset = async (email: string) => {
    const requestPasswordResetResult = await sendSignInLinkToEmail(
      auth,
      email,
      {
        url:
          process.env.NODE_ENV === "production"
            ? "https://" + appConfig.url + "/reset"
            : "https://localhost:3000/reset",
        handleCodeInApp: true,
      }
    );
    console.log({ requestPasswordResetResult });
    return requestPasswordResetResult;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        requestPasswordReset,
        isSignInWithLink,
        signInWithLink,
        setNewPassword,
        loading,
      }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
```

`AuthContext` handles authentication scenarios from signup and signout to password resets. We need to add the `AuthContextProvider` to our Custom App component:

```
import "@/styles/globals.css";
...
import { AuthContextProvider } from "@/context/AuthContext";

...

export default function App({ Component, pageProps }: AppProps) {
  const {
    openGraphData = defaultOpenGraphData,
    title,
    description,
  } = pageProps;
  return (
    <AuthContextProvider>
      {openGraphData.length > 0 && (
```

Next we can add pages and forms to allow the user to interact with our application.

First, let's set up a sign up page:

```
// src/pages/signup.tsx
import Link from "next/link";
import SignUpForm from "@/components/ui/forms/SignUpForm";

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <SignUpForm />
      <p className="pt-16">
        Already have an account?{" "}
        <Link className="text-indigo-400" href="/signin">
          Sign In
        </Link>
      </p>
    </div>
  );
}
```

And a form:

```
// src/components/ui/forms/SignUpForm.tsx
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";

const SignUpForm = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSubmitting) {
      setIsSubmitting(true);
      try {
        await signUp(email, password, name);
        router.push("/");
      } catch (error: any) {
        setError(error.message);
        setIsSubmitting(false);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="text-black bg-white px-16 py-12 shadow-lg rounded-xl max-w-lg mx-auto"
    >
      <h2 className="font-bold text-2xl sm:text-4xl pb-12 text-center">
        Create Account
      </h2>
      <div
        className="text-sm sm:text-lg sm:grid gap-x-2 gap-y-6"
        style={{ gridTemplateColumns: "1fr 2fr" }}
      >
        <label
          htmlFor="name"
          className="pt-2 px-2 pb-1 text-base w-full block text-left sm:text-right"
        >
          Display Name
        </label>
        <input
          className="rounded-lg border-2 border-gray-200 px-4 py-2 mb-4"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          name="name"
          type="text"
          required
        />
        <label
          htmlFor="email"
          className="pt-2 px-2 pb-1 text-base w-full block text-left sm:text-right"
        >
          Email
        </label>
        <input
          className="rounded-lg border-2 border-gray-200 px-4 py-2 mb-4"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          type="email"
          required
        />
        <label
          htmlFor="password"
          className="pt-2 px-2 pb-1 text-base w-full block text-left sm:text-right"
        >
          Password
        </label>
        <input
          className="rounded-lg border-2 border-gray-200 px-4 py-2 mb-4"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
          type="password"
          required
        />
      </div>
      <div
        className={`py-2 text-sm sm:text-base text-red-600 ${
          error ? "opacity-100" : "opacity-0"
        }`}
      >
        {error && error.replace("Firebase: ", "")}
      </div>
      <div className="flex justify-end mb-2">
        <button
          disabled={isSubmitting}
          type="submit"
          className={`font-sans ${
            isSubmitting ? "bg-gray-600" : "bg-indigo-600"
          } w-full sm:w-auto text-white rounded-xl py-3 px-8 text-xl`}
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
```

The `SignUpForm` component contains a form with input fields for the user's display name, email, and password. It uses the u`seAuth` hook from the `AuthContext` to access the signUp function. When the form is submitted, it calls the signUp function with the entered email, password, and display name.

When the user submits the form, the `handleSubmit` function is called. It prevents the default form submission behavior, checks if the form is not already being submitted, and sets the `isSubmitting` state to `true`. Then, it tries to sign up the user using `signUp()` from the `AuthContext`. If successful, it redirects the user to the home page.

How do we get to the signup form? And after you signup, how do you know it worked? Let's update the home page.

```
// src/pages/index.tsx
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-8">
      <h2 className="text-2xl font-bold">HOME</h2>
      {user?.uid ? (
        <h3>Welcome back {user.displayName}</h3>
      ) : (
        <Link
          className="bg-indigo-600 text-lg text-white rounded-lg px-8 py-3"
          href="/signup"
        >
          Sign Up
        </Link>
      )}
    </div>
  );
}
```

Ok, now we have signup working. Let's do sign out next by adding a header state with a dropdown. I'd rather not code up my own dropdown, so let's use headlessui, heroicons and Tailwind (note: go ahead and buy [Tailwind UI](https://tailwindui.com/) - it is worth it)

```
npm i @headlessui/react @heroicons/react
```

Now we will update our `Header` component with a sign in link when signed out, and an `AccountDropdown` to sign out.

```
// src/components/ui/Header.tsx
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import AccountDropdown from "./controls/AccountDropdown";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="flex items-center px-16 py-8 bg-white w-full">
      <Link href="/" className="text-3xl tracking-widest text-gray-400">
        LOGO
      </Link>
      <nav className="flex flex-1 justify-end">
        {user?.uid ? (
          <AccountDropdown displayName={user.displayName} />
        ) : (
          <Link className="py-2 px-6 border-2 rounded-lg" href="/signin">
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}

```

```
/// src/components/ui/controls/AccountDropdown.tsx
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function AccountDropdown({
  displayName,
}: {
  displayName: string;
}) {
  const { signOut } = useAuth();
  const router = useRouter();

  const onSignOut = async () => {
    await signOut();
    localStorage.clear();
    router.push("/");
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {displayName}
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/account"
                  className={`${
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                  } block px-4 py-2 text-sm`}
                >
                  Account settings
                </Link>
              )}
            </Menu.Item>
            <form method="POST" action="/api/signout">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={onSignOut}
                    className={`${
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                    } block w-full px-4 py-2 text-left text-sm`}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </form>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
```

Now, we can sign out so we need to be able to sign back in again. In our header, when we are signed out we have a link to sign in. This will require us to set up a page and form similar to sign up.

```
// src/pages/signin.tsx
import Link from "next/link";
import SignInForm from "@/components/ui/forms/SignInForm";

export default function Signup() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <SignInForm />
      <p className="pt-12">
        Forgot your password?{" "}
        <Link className="text-indigo-600" href="/forgot">
          Reset password
        </Link>
      </p>
      <p className="pt-4">
        Don’t have an account?{" "}
        <Link className="text-indigo-600" href="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
```

```
// src/components/ui/forms/SignInForm.tsx 
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/router";

const SignInForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSubmitting) {
      setIsSubmitting(true);
      try {
        await signIn(email, password);
        router.push("/");
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="text-black bg-white px-12 py-9 shadow-lg rounded-xl max-w-lg mx-auto"
    >
      <h2 className="font-bold text-2xl sm:text-4xl pb-12 text-center">
        Sign In
      </h2>
      <div
        className="flex flex-col sm:grid sm:gap-4"
        style={{ gridTemplateColumns: "1fr 3fr" }}
      >
        <label
          htmlFor="email"
          className="pt-2 px-2 pb-1 text-base w-full block text-left sm:text-right"
        >
          Email
        </label>
        <input
          className="rounded-lg border-2 border-gray-200 px-4 py-2 mb-4"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          type="email"
          required
        />
        <label
          htmlFor="password"
          className="pt-2 px-2 pb-1 text-base w-full block text-left sm:text-right"
        >
          Password
        </label>
        <input
          className="rounded-lg border-2 border-gray-200 px-4 py-2 mb-4"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
          type="password"
          required
        />
      </div>
      <div
        className={`py-2 text-red-600 ${error ? "opacity-100" : "opacity-0"}`}
      >
        {error ? error : "no error"}
      </div>
      <div className="flex justify-end mb-2">
        <button
          disabled={isSubmitting}
          type="submit"
          className={`font-sans ${
            isSubmitting ? "bg-gray-500" : "bg-indigo-600"
          } text-white rounded-xl py-3 px-8 text-xl`}
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
```

We could stop there and move on, but for this to be a production-ready web app, we need a way to recover an account. Let's set up a reset password flow.

First, we will have to configure our Firebase project by going the "Templates" tab in the Authentication section. Here, you'll find the email templates that Firebase uses for various authentication-related actions. Find the "Password Reset" template and click on the pencil icon to edit its settings. 

In the "Password Reset" template settings, you can customize the email's subject, content, and sender name. Make sure to include the {%LINK} placeholder in the email content where you want the password reset link to appear. This placeholder will be replaced with the actual password reset link when the email is sent. Click "Save" to apply your changes.

Later on, when your project has its own url, you can customize from "from" domain.

Next, let's update our UI, starting with a forgot password page:

```
import ForgotPasswordForm from "@/components/ui/forms/ForgotPasswordForm";

export default function Reset() {
  return (
    <div className="flex -mt-24 justify-center">
      <ForgotPasswordForm />
    </div>
  );
}
```

```
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Input from "../controls/Input";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isRequested, setIsRequested] = useState<boolean>(false);
  const { requestPasswordReset } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRequested) {
      setIsRequested(true);
      try {
        const result = await requestPasswordReset(email);
        localStorage.setItem("emailForSignIn", email);
        setIsRequested(true);
      } catch (error: any) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      {isRequested ? (
        <div className="relative z-10 mt-64 text-black bg-white rounded-xl max-w-lg px-16 py-12 text-center">
          <h2 className="font-bold text-3xl sm:text-4xl pb-6">
            Check Your Email
          </h2>
          <p className="text-lg text-gray-600 px-4">
            Password reset instructions have been sent to your inbox.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="relative z-10 mt-64 text-black bg-white rounded-xl max-w-lg px-16 py-12"
        >
          <h2 className="font-bold text-3xl sm:text-4xl pb-6">
            Forgot Password
          </h2>
          <div className="grid gap-4">
            <label htmlFor="email" className="pt-2 text-center">
              Enter Your Email
            </label>
            <Input
              className="text-center"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
              type="email"
            />
          </div>
          <div
            className={`py-2 text-red-600 ${
              error ? "opacity-100" : "opacity-0"
            }`}
          >
            {error ? error : "no error"}
          </div>
          <div className="flex justify-center mb-2">
            <button
              type="submit"
              className="font-sans bg-indigo-600 text-white rounded-xl py-3 px-8 text-xl"
            >
              Reset Password
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ForgotPasswordForm;
```

Then the reset page and form where they will enter the code that they will have received in their email:

```
import ResetPasswordForm from "@/components/ui/forms/ResetPasswordForm";

export default function Reset() {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <ResetPasswordForm />
    </div>
  );
}
```

```
import { useEffect } from "react";
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { UserCredential } from "firebase/auth";
import Input from "../controls/Input";
import Link from "next/link";

const ResetPasswordForm = () => {
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [emailMissing, setEmailMissing] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [isValidLink, setIsValidLink] = useState<boolean>(false);
  const { isSignInWithLink, signInWithLink, setNewPassword, auth } = useAuth();

  useEffect(() => {
    isSignInWithLink(window.location.href).then((linkCheck: boolean) => {
      setIsValidLink(linkCheck);
    });
  }, []);

  useEffect(() => {
    if (isValidLink && signInWithLink) {
      const emailForSignIn = window.localStorage.getItem("emailForSignIn");
      if (emailForSignIn) {
        signInWithLink(emailForSignIn, window.location.href)
          .then((result: UserCredential) => {
            setEmail(emailForSignIn);
            window.localStorage.removeItem("emailForSignIn");
          })
          .catch((error: any) => {
            // Some error occurred, you can inspect the code: error.code
            // Common errors could be invalid email and invalid or expired OTPs.
          });
      } else {
        setEmailMissing(true);
      }
    }
  }, [isValidLink, signInWithLink]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setNewPassword(password);
      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      {success ? (
        <div className="flex flex-col gap-8 text-black bg-white rounded-xl max-w-lg p-16 text-2xl text-center">
          <span className="font-bold">Password was set successfully!</span>
          <Link
            className="bg-indigo-600 text-white rounded-xl py-3 px-8 text-xl"
            href="/"
          >
            Go Home
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="text-black bg-white rounded-xl max-w-lg px-16 py-12"
        >
          <h2 className="font-bold text-4xl pb-6">Set New Password</h2>
          {emailMissing && (
            <div className="grid gap-4">
              <label htmlFor="email" className="pt-2 text-center">
                Email
              </label>
              <Input
                className="text-center"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                name="email"
                type="email"
                required={true}
              />
            </div>
          )}
          <div className="grid gap-4">
            <label htmlFor="password" className="pt-2 text-center sr-only">
              New Password
            </label>
            <Input
              className="text-center"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              type="password"
              required={true}
            />
          </div>
          <div
            className={`py-2 text-red-600 ${
              error ? "opacity-100" : "opacity-0"
            }`}
          >
            {error ? error : "no error"}
          </div>
          <div className="flex justify-center mb-2">
            <button
              type="submit"
              className="font-sans bg-indigo-600 text-white rounded-xl py-3 px-8 text-xl"
            >
              Reset Password
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default ResetPasswordForm;
```



## Managing Users

We have users now. What happens when they want to make an updates to their account? Let's make an account page available via a link in the header dropdown.

Rather than using the client-side auth from Firebase, we are going to use their Admin SDK. This will let us apply the update with a single save and will be something we use in the future to interact with a Firestore database.

We will need to set up two secrets and add them to the 





## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
