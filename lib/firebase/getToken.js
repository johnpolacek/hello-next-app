/* globals window */
import firebase from "firebase/app"
import "firebase/auth"
import initFirebase from "./initFirebase"

initFirebase()

firebase.auth().onAuthStateChanged(function (user) {})

export default async () => {
  if (!firebase.auth().currentUser) {
    return {
      success: false,
      error: "Re-Authentication required. Please logout and then login again.",
    }
  } else {
    return firebase
      .auth()
      .currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (token) {
        return { success: true, token }
      })
      .catch(function (error) {
        return { success: false, error }
      })
  }
}
