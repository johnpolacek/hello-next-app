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

export default async (userId) => {
  var usersRef = db.collection("users").doc(userId)

  return usersRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const planId = doc.data().plan
        if (planId && planId !== 0) {
          var plansRef = db.collection("plans").doc(planId)
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
          // if no plan, then they are on the free plan
          const freePlan = appConfig.plans.filter((plan) => {
            return plan.price === 0
          })[0]
          console.log("freePlan", freePlan)
          return { id: 0, ...freePlan }
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
