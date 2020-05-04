import React, { useState } from "react"
import Router from "next/router"
import Link from "next/link"
import firebase from "firebase/app"
import "firebase/auth"
import initFirebase from "../../../utils/firebase/initFirebase"
import { Box, Text, Label, Input, Checkbox } from "theme-ui"
import Form from "./Form"

const SignupLink = () => (
  <Text sx={{ pt: 4, width: "100%", textAlign: "center" }}>
    Don’t have an account?{" "}
    <Link href="/signup" passHref>
      <a>Sign Up</a>
    </Link>
  </Text>
)

export default () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async () => {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((result) => {
          console.log("LoginFormIron result", result)
          var user = firebase.auth().currentUser
          if (user) {
            fetch("/api/login", {
              method: "POST",
              // eslint-disable-next-line no-undef
              headers: new Headers({ "Content-Type": "application/json" }),
              credentials: "same-origin",
              body: JSON.stringify({ user }),
            }).then(() => {
              Router.push("/")
            })
          } else {
            setError("Not able to sign in")
          }
        })
    } catch (err) {
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError("This login was not valid. Please try again")
      } else {
        setError(err.message)
      }
      console.log(err)
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      heading="Login to your Account"
      buttonText="Login"
      after={<SignupLink />}
      error={error}
      id="LoginForm"
    >
      <Label htmlFor="email">Email</Label>
      <Input
        name="email"
        type="email"
        required="required"
        onChange={(e) => {
          setEmail(e.target.value)
          setError("")
        }}
        value={email}
      />
      <Label htmlFor="password">Password</Label>
      <Input
        name="password"
        required="required"
        onChange={(e) => {
          setPassword(e.target.value)
          setError("")
        }}
        value={password}
        type="password"
      />
      <Box sx={{ pb: 4 }}>
        <Link href="/forgot" passHref>
          <a>Forgot password?</a>
        </Link>
      </Box>
    </Form>
  )
}
