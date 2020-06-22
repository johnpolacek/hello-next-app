// This is for updating a property value for authentication-related data for users.
// For updating other user data stored in the users collection, see updateUserProperty

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

export default async (token, prop, val) => {
  let updateData = {}
  updateData[prop] = val
  return admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      admin
        .auth()
        .updateUser(decodedToken.uid, updateData)
        .then(() => {
          return { result: "success" }
        })
        .catch((error) => {
          return { result: "error", error }
        })
    })
    .catch((error) => {
      return { result: "error", error }
    })
}
