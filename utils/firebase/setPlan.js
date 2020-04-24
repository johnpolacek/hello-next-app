/* globals window */
import firebase from "firebase/app"
import "firebase/firestore"
import Router from "next/router"
import { stringToSlug } from "../functions"

export default async (plan) => {
  console.log("setPlan plan", plan)
  return firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // first create the plan
      // planId is user id + timestamp (users may change their plan or get a new one when they renew)
      const userPlanId = user.uid + "-" + new Date().getTime()
      const expiration = new Date()
      expiration.setFullYear(expiration.getFullYear() + 1)

      firebase
        .firestore()
        .collection("plans")
        .doc(userPlanId)
        .set({
          price: plan.price,
          type: plan.name,
          plan: plan.id,
          subscription: plan.items.data[0].subscription,
        })
        .then(() => {
          // then attach it to the user in the database
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .set({
              plan: userPlanId,
            })
            .then(() => {
              Router.push("/plans/" + stringToSlug(plan.name) + "/paid")
            })
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
