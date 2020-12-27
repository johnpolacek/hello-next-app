module.exports = {
  // url : used to set the password reset flow for each environment
  url: {
    production: "https://hello-next-app.now.sh",
    staging: "https://hello-next-app.now.sh",
    local: "http://localhost:3000",
  },
  // if you wish to add google analytics, add your code here
  analytics: "YOUR_GA_CODE_HERE",
  // name : appears in page titles, header nav
  name: "Hello Next App",
  // company : appears in footer
  company: {
    name: "Hello Next App",
    description:
      "Helping you get from zero to production-ready serverless web app.",
  },
  // shortDescription : appears in landing page title
  shortDescription: "Next.js Web App Template",
  // longDescription : appears in landing page meta description
  longDescription:
    "Web App Project Template for building application websites with the Next.js Framework, a Firebase Serverless Backend, Theme UI Components and more.",
  // headline: appears as landing page headline
  headline: "From Zero to Web App",
  // subhead: appears below the landing page headline
  subhead:
    "Launch your next web application with serverless backend, user authentication, automated testing, Stripe integration, a custom design theme and more.",
  // contact appears in the privacy policy page
  contact: "support@hellonextapp.com",
  // support appears when errors happen
  support: "support@hellonextapp.com",
  // add all your social links, will get added automatically as long as they are supported by react-social-icons https://jaketrent.github.io/react-social-icons/
  social: ["https://twitter.com/johnpolacek", "https://github.com/johnpolacek"],
  // use this to set the links in the main nav
  links: {
    footer: {
      About: "/about",
      Documentation: "/docs",
      Pricing: "/pricing",
      "Privacy Policy": "/privacy",
      "Terms of Service": "/terms",
    },
    nav: {
      About: "/about",
      Blog: "/blog",
      Docs: "/docs",
    },
  },
  // use this to add a demo section to the site
  demo: "https://hello-next-app.now.sh",
  // use this to add a link on the landing page to a product on gumroad
  gumroad: "https://gum.co/vUpFK",
  // plans appears on pricing page and in account creation flow
  // assumes $ / month
  // customize
  // plans: [
  //   {
  //     name: "Starter",
  //     price: 0,
  //     description: "Get started for free",
  //     includes: ["1 user", "1GB File Storage", "Email Support"],
  //     isMonthly: true,
  //     planId: null, // free plans do not have a Stripe Product Id so do not get an ad
  //     planIdTest: null,
  //   },
  //   {
  //     name: "Pro",
  //     price: 100,
  //     description: "The right plan for most people",
  //     includes: [
  //       "10 users",
  //       "10GB File Storage",
  //       "Email Support",
  //       "White Label Branding",
  //       "Custom Design Theme",
  //     ],
  //     isMonthly: true,
  //     planId: "plan_H98v4Soymn4QE3", // Stripe Product Id
  //     planIdTest: "plan_H98v4Soymn4QE3", // Stripe Product Id Test
  //   },
  //   {
  //     name: "Premium",
  //     price: 200,
  //     description: "Serious power users and businesses",
  //     includes: [
  //       "25 users",
  //       "25GB File Storage",
  //       "Priority Email Support",
  //       "White Label Branding",
  //       "Custom Design Theme",
  //       "Personalized Onboarding",
  //       "Custom Domain",
  //     ],
  //     isMonthly: true,
  //     planId: "plan_H98v1kie0YIbxG", // Stripe Product Id
  //     planIdTest: "plan_H98v1kie0YIbxG", // Stripe Product Id Test
  //   },
  // ],
  // trial: "30 day",
}
