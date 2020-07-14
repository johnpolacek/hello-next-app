import { setCookie } from "nookies"
import React, { useState } from "react"
import Router from "next/router"
import Link from "next/link"
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import initFirebase from "../../../lib/firebase/initFirebase"
import { Box, Text, Label, Input, Checkbox } from "theme-ui"
import Form from "./Form"

initFirebase()

const LoginLink = () => (
  <Text sx={{ pt: 4, width: "100%", textAlign: "center" }}>
    Already have an account?{" "}
    <Link href="/login" passHref>
      <a>Login</a>
    </Link>
  </Text>
)

export default () => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [password, setPassword] = useState("")
  const [checked, setChecked] = useState(false)

  const onCheck = () => {
    setError("")
    setChecked(!checked)
  }

  const handleSubmit = async () => {
    if (checked) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
          var user = firebase.auth().currentUser
          if (user) {
            firebase
              .firestore()
              .collection("users")
              .doc(user.uid)
              .set({
                plan: 0,
              })
              .then(() => {
                fetch("/api/login", {
                  method: "POST",
                  // eslint-disable-next-line no-undef
                  headers: new Headers({ "Content-Type": "application/json" }),
                  credentials: "same-origin",
                  body: JSON.stringify({ user }),
                }).then(() => {
                  setCookie(null, "accountEmail", email, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                  })
                  setCookie(null, "uid", user.uid, {
                    maxAge: 30 * 24 * 60 * 60,
                    path: "/",
                  })
                  Router.push("/plans")
                })
              })
          } else {
            setError("Not able to sign in")
          }
        })
        .catch((err) => {
          console.error("SignupForm error")
        })
    } else {
      setError("Please agree to the terms and conditions to create an account.")
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      heading="Create an account"
      buttonText="Sign Up"
      after={<LoginLink />}
      error={error}
      id="SignupForm"
    >
      <Label htmlFor="email">Email</Label>
      <Input
        name="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        required="required"
        value={email}
      />
      <Label htmlFor="password">
        Password{" "}
        <Text as="small" sx={{ fontSize: 0 }}>
          (at least 8 characters)
        </Text>
      </Label>
      <Input
        name="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required="required"
      />
      <Box sx={{ pb: 4 }}>
        <Label sx={{ display: "flex", cursor: "pointer" }}>
          <Checkbox onChange={onCheck} checked={checked} />I agree to the&nbsp;
          <Link href="/terms" passHref>
            <a>terms and conditions</a>
          </Link>
        </Label>
      </Box>
    </Form>
  )
}
