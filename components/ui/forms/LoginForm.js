import React, { useState } from "react"
import Router from "next/router"
import firebase from "firebase/app"
import Link from "next/link"
import "firebase/auth"
import initFirebase from "../../../utils/auth/initFirebase"
import { Box, Text, Label, Input, Checkbox } from "theme-ui"
import Form from "./Form"

// Init the Firebase app.
initFirebase()

const Signup = () => (
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

  const handleSubmit = async () => {
    setError("")
    setIsSubmitting(true)
    try {
      let result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      Router.push("/")
    } catch (err) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      heading="Login to your Account"
      buttonText="Login"
      after={<Signup />}
    >
      <Label htmlFor="email">Email</Label>
      <Input
        name="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        mb={3}
      />
      <Label htmlFor="password">Password</Label>
      <Input
        name="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        mb={3}
      />
      <Box sx={{ pb: 4 }}>
        <Link href="/forgot" passHref>
          <a>Forgot password?</a>
        </Link>
      </Box>
    </Form>
  )
}
