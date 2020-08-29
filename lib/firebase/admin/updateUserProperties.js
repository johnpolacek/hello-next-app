// This is for updating a property values for a user in the users collection.
// For updating authentication-related data for users (e.g. email, password, etc.), see updateAuthUserProperty

/* globals window */
import firebase from "firebase/app"
import "firebase/firestore"

const appConfig = require("../../../app.config")
const serviceAccount = require("./firebase-adminsdk-ykx60-eb3ef0c1c5.json")
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

const UpdateUserProperties = async (uid, updateData) => {
  return admin
    .firestore()
    .collection("users")
    .doc(uid)
    .set(updateData)
    .then(() => {
      return { result: "success" }
    })
    .catch(function (error) {
      console.error("Error setting " + prop + " to " + val + ": ", error)
      return { result: "error", error }
    })
}

export default UpdateUserProperties
