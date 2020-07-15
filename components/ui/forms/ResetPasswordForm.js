import React, { useState } from "react"
import Router from "next/router"
import Link from "next/link"
import firebase from "firebase/app"
import "firebase/auth"
import initFirebase from "../../../lib/firebase/initFirebase"
import { Flex, Box, Heading, Text, Label, Input, Checkbox } from "theme-ui"
import Form from "./Form"

// Init the Firebase app.
initFirebase()

const ResetPasswordForm = () => {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResetComplete, setIsResetComplete] = useState(false)

  const handleSubmit = async () => {
    setError("")
    setIsSubmitting(true)
    try {
      let result = await firebase.auth().currentUser.updatePassword(password)
      setIsResetComplete(true)
    } catch (err) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  return (
    <Flex sx={{ justifyContent: "center", width: "100%" }}>
      {isResetComplete ? (
        <Box sx={{ color: "white", textAlign: "center" }}>
          <Heading as="h1">Password Saved!</Heading>
          <Heading variant="subhead" as="h2">
            You’re all set.
          </Heading>
        </Box>
      ) : (
        <Form
          onSubmit={handleSubmit}
          heading="Reset Password"
          buttonText="Save Password"
          id="ResetPasswordForm"
        >
          <Label htmlFor="password">New Password</Label>
          <Input
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
        </Form>
      )}
    </Flex>
  )
}

export default ResetPasswordForm
