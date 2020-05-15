// deletes the test user account created during signups
// CLI command from project root:
// export GOOGLE_APPLICATION_CREDENTIALS="./lib/firebase/admin/firebase-adminsdk-ykx60-eb3ef0c1c5.json" && node ./lib/firebase/admin/deleteTestUser.js

const appConfig = require("../../../app.config")

let admin = require("firebase-admin")

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://" + appConfig.databaseName + ".firebaseio.com",
})
let db = admin.firestore()

admin
  .auth()
  .getUserByEmail("test@hellonextapp.com")
  .then(function (userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully fetched user data for uid:", userRecord.uid)
    admin
      .auth()
      .deleteUser(userRecord.uid)
      .then(function () {
        console.log("Successfully deleted user")
        db.collection("users")
          .doc(userRecord.uid)
          .delete()
          .then(function () {
            console.log("User Document successfully deleted!")
            db.collection("plans")
              .get()
              .then((snapshot) => {
                if (snapshot.empty) {
                  console.log("No plans to delete.")
                  process.exit()
                }
                snapshot.forEach((doc) => {
                  if (doc.id.includes(userRecord.uid)) {
                    db.collection("plans")
                      .doc(doc.id)
                      .delete()
                      .then(() => {
                        console.log("deleted plan " + doc.id)
                        process.exit()
                      })
                      .catch((err) => {
                        console.log("Error deleting document", err)
                        process.exit()
                      })
                  }
                })
                process.exit()
              })
              .catch((err) => {
                console.log("Error getting documents", err)
                process.exit()
              })
          })
          .catch(function (error) {
            console.error("Error removing document: ", error)
            process.exit()
          })
      })
      .catch(function (error) {
        console.log("Error deleting user:", error)
        process.exit()
      })
  })
  .catch(function (error) {
    console.log("Test user does not exist")
    process.exit()
  })
