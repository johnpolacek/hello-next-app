/* globals window */
import firebase from "firebase/app"
import "firebase/firestore"
import Router from "next/router"
import { stringToSlug } from "../functions"

export default async (userId) => {
  console.log("getPlan userId", userId)

  var usersRef = firebase.firestore().collection("users").doc(userId)

  return usersRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const planId = doc.data().plan
        var plansRef = firebase.firestore().collection("plans").doc(planId)
        return plansRef
          .get()
          .then((planDoc) => {
            if (planDoc.exists) {
              return { ...{ id: planId }, ...planDoc.data() }
            } else {
              console.log("No such plan!")
              return false
            }
          })
          .catch(function (error) {
            console.log("Error getting plan document:", error)
            return false
          })
      } else {
        console.log("No such user!")
        return false
      }
    })
    .catch(function (error) {
      console.log("Error getting user document:", error)
      return false
    })
}
