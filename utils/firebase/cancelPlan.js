/* globals window */
import firebase from "firebase/app"
import "firebase/firestore"
import Router from "next/router"
import { stringToSlug } from "../functions"

export default async (planId, subscriptionId, userId) => {
  const response = await fetch("/api/cancelSubscription", {
    method: "POST",
    mode: "same-origin",
    body: JSON.stringify({
      planId,
      subscriptionId,
      userId,
    }),
  })
  const responseData = await response.json()
  if (responseData.err || responseData.confirmation.status !== "canceled") {
    return { error: responseData.err.raw.message }
  } else {
    return firebase
      .firestore()
      .collection("users")
      .doc(userId)
      .set({
        plan: 0,
      })
      .then(() => {
        return { result: "success" }
      })
      .catch(function (error) {
        console.error("Error cancelling plan: ", error)
        return error
      })
  }
}
