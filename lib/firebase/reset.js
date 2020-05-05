/* globals window */
import firebase from "firebase/app"
import "firebase/auth"

import appConfig from "../../app.config"

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be whitelisted in the Firebase Console.
  url: appConfig.url.local + "/reset",
  // This must be true.
  handleCodeInApp: true,
}

export default async (email) => {
  return firebase
    .auth()
    .sendSignInLinkToEmail(email, actionCodeSettings)
    .then(function () {
      // The link was successfully sent. Inform the user.
      // Save the email locally so you don't need to ask the user for it again
      // if they open the link on the same device.
      window.localStorage.setItem("emailForSignIn", email)
    })
    .catch((e) => {
      console.error(e)
      return false
    })
}
