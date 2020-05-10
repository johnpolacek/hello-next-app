/* globals window */
import firebase from "firebase/app"
import initFirebase from "./initFirebase"
import "firebase/firestore"
import Router from "next/router"
import { stringToSlug } from "../util"

initFirebase()

export default async (userId) => {
  var usersRef = firebase.firestore().collection("users").doc(userId)

  return usersRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const planId = doc.data().plan
        if (planId && planId !== 0) {
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
          return { id: 0 }
        }
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
