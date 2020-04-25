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
  name: "Your App",
  // shortDescription : appears in landing page title
  shortDescription: "Very Short App Description",
  // longDescription : appears in landing page meta description
  longDescription:
    "Longer description of your app that will appear in search engine results and when people post links to your site on social media.",
  // headline: appears as landing page headline
  headline: "High Converting Headline Goes Here",
  // subhead: appears below the landing page headline
  subhead:
    "Subhead copy that explains the features and benefits of your app to your audience of potential users and captures their interest to get them to sign up or find out more.",
  // contact appears in the privacy policy page
  contact: "contact@yourappdomain.com",
  // support appears when errors happen
  support: "support@yourappdomain.com",
  // plans appears on pricing page and in account creation flow
  // assumes $ / month
  // customize
  plans: [
    {
      name: "Starter",
      price: 0,
      description: "Get started for free",
      includes: ["1 user", "1GB File Storage", "Email Support"],
      isMonthly: true,
      // free plans do not need a plan id
    },
    {
      name: "Pro",
      price: 100,
      description: "The right plan for most people",
      includes: [
        "10 users",
        "10GB File Storage",
        "Email Support",
        "White Label Branding",
        "Custom Design Theme",
      ],
      isMonthly: true,
      planId: "plan_H98v4Soymn4QE3", // Stripe Product Id
      planIdTest: "plan_H98v4Soymn4QE3", // Stripe Product Id Test
    },
    {
      name: "Premium",
      price: 200,
      description: "Serious power users and businesses",
      includes: [
        "25 users",
        "25GB File Storage",
        "Priority Email Support",
        "White Label Branding",
        "Custom Design Theme",
        "Personalized Onboarding",
        "Custom Domain",
      ],
      isMonthly: true,
      planId: "plan_H98v1kie0YIbxG", // Stripe Product Id
      planIdTest: "plan_H98v1kie0YIbxG", // Stripe Product Id Test
    },
  ],
  trial: "30 day",
}
