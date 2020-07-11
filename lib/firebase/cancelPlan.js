/* globals window */
import firebase from "firebase/app"
import "firebase/firestore"
import Router from "next/router"
import { stringToSlug } from "../util"

export default async (planId, subscriptionId, uid) => {
  const response = await fetch("/api/cancelSubscription", {
    method: "POST",
    mode: "same-origin",
    body: JSON.stringify({
      planId,
      subscriptionId,
      uid,
    }),
  })
  const responseData = await response.json()
  if (
    responseData.err ||
    !responseData.confirmation ||
    responseData.confirmation.status !== "canceled"
  ) {
    return {
      error: responseData.err ? responseData.err.raw.message : responseData,
    }
  } else {
    return firebase
      .firestore()
      .collection("users")
      .doc(uid)
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
