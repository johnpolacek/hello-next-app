/* globals window */
import firebase from "firebase/app"
import initFirebase from "./initFirebase"
import "firebase/firestore"
import Router from "next/router"
import { stringToSlug } from "../util"

initFirebase()

export default async (plan) => {
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
          name: plan.name,
          plan: plan.id,
          subscription: plan.items.data[0].subscription,
          last4:
            plan.latest_invoice.payment_intent.charges.data[0]
              .payment_method_details.card.last4,
          network:
            plan.latest_invoice.payment_intent.charges.data[0]
              .payment_method_details.card.network,
          expires:
            plan.latest_invoice.payment_intent.charges.data[0].payment_method_details.card.exp_month
              .toString()
              .padStart(2, "0") +
            "/" +
            plan.latest_invoice.payment_intent.charges.data[0].payment_method_details.card.exp_year
              .toString()
              .substr(2),
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
              Router.push("/plans/" + stringToSlug(plan.name) + "/ready")
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
