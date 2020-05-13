// deletes the test user account created during signups
// CLI command from project root:
// export GOOGLE_APPLICATION_CREDENTIALS="./lib/firebase/admin/firebase-adminsdk-ykx60-eb3ef0c1c5.json" && node ./lib/firebase/admin/deleteTestUser.js

let admin = require("firebase-admin")

const DATABASE_NAME = "hello-next-app"

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://" + DATABASE_NAME + ".firebaseio.com",
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
            process.exit()
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
