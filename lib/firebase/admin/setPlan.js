// This is for updating a property values for a user in the users collection.
// For updating authentication-related data for users (e.g. email, password, etc.), see updateAuthUserProperty

/* globals window */
import firebase from "firebase/app"
import "firebase/firestore"

const appConfig = require("../../../app.config")
const serviceAccount = require("./firebase-adminsdk.json")
const admin = require("firebase-admin")

try {
  admin.instanceId()
} catch (err) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://" + appConfig.databaseName + ".firebaseio.com",
    databaseAuthVariableOverride: {
      uid: "my-service-worker",
    },
  })
}

let db = admin.firestore()

const SetPlan = async (userPlanId, uid, plan) => {
  if (plan.id === 0) {
    return db
      .collection("users")
      .doc(uid)
      .set({
        plan: 0,
      })
      .then(() => {
        return { result: "success" }
      })
      .catch(function (error) {
        console.error("Error setting free plan")
        return { result: "error", error }
      })
  } else {
    return db
      .collection("plans")
      .doc(userPlanId)
      .set({
        price: plan.price,
        name: plan.name,
        plan: plan.id,
        subscription: plan.subscription,
        last4: plan.last4,
        network: plan.network,
        expires: plan.expires,
      })
      .then(() => {
        return { result: "success" }
      })
      .catch(function (error) {
        console.error("Error setting " + prop + " to " + val + ": ", error)
        return { result: "error", error }
      })
  }
}

export default SetPlan
