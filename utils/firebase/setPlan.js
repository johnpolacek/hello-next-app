/* globals window */
import firebase from "firebase/app"
import "firebase/firestore"

export default async (plan) => {
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("setPlan  user", user)

      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({
          id: user.uid,
          plan: plan,
        })
        .then(function (docRef) {
          console.log("docRef", docRef)
          return docRef
        })
        .catch(function (error) {
          console.error("Error adding document: ", error)
          return false
        })
    } else {
      return false
    }
  })
}
