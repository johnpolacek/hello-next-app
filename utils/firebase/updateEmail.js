/* globals window */
import firebase from "firebase/app"
import "firebase/auth"

export default async (email) => {
  return firebase
    .auth()
    .currentUser.updateEmail(email)
    .then(function (res) {
      console.log("res", res)
      return { success: true, ...res }
    })
    .catch((e) => {
      console.error(e)
      return { success: false, ...e }
    })
}
