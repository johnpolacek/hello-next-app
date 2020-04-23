/* globals window */
import firebase from "firebase/app"
import "firebase/firestore"
import Router from "next/router"
import { stringToSlug } from "../functions"

export default async (userId) => {
  console.log("getPlan userId", userId)

  var docRef = firebase.firestore().collection("users").doc(userId)

  return docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        const planId = doc.data().plan
        console.log("getPlan planId", planId)
        return planId
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!")
        return false
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error)
      return false
    })

  // return firebase.auth().onAuthStateChanged((user) => {
  //   console.log("onAuthStateChanged user", user)
  //   firebase
  //     .firestore()
  //     .ref("/users/" + userId)
  //     .once("value")
  //     .then(function (snapshot) {
  //       const planId = snapshot.val() && snapshot.val().plan
  //       console.log("getPlan planId", planId)
  //       return planId
  //     })
  //     .catch(function (error) {
  //       return false
  //     })
  // })
}
