import React, { useState } from "react"
import Router from "next/router"
import firebase from "firebase/app"
import "firebase/auth"
import initFirebase from "../../../utils/auth/initFirebase"
import { Flex, Heading, Text, Label, Input, Button } from "theme-ui"

// Init the Firebase app.
initFirebase()

export default () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)
    try {
      let result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
      Router.push("/")
    } catch (err) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  return (
    <Flex sx={{ justifyContent: "center", width: "100%" }}>
      <form onSubmit={handleSubmit}>
        <Heading as="h2" sx={{ mb: 4, color: "primary" }}>
          Create a new account
        </Heading>
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
        {error && <Text sx={{ color: "red" }}>{error}</Text>}
        <Button disabled={isSubmitting} type="submit">
          Sign Up
        </Button>
      </form>
    </Flex>
  )
}
