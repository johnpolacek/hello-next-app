import React, { useState } from "react"
import Router from "next/router"
import firebase from "firebase/app"
import Link from "next/link"
import "firebase/auth"
import initFirebase from "../../../utils/auth/initFirebase"
import {
  Flex,
  Box,
  Card,
  Heading,
  Text,
  Label,
  Input,
  Checkbox,
  Button,
} from "theme-ui"

// Init the Firebase app.
initFirebase()

export default () => {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isResetComplete, setIsResetComplete] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
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
          <Heading sx={{ pb: 3 }} as="h1">
            Password Saved!
          </Heading>
          <Heading sx={{ fontWeight: "lite", pb: 4 }} as="h2">
            You’re all set.
          </Heading>
        </Box>
      ) : (
        <Card as="form" sx={{ bg: "white" }} onSubmit={handleSubmit}>
          <Heading
            as="h2"
            sx={{
              pb: 4,
              px: 4,
              fontSize: 5,
              fontWeight: "semibold",
              color: "primary",
            }}
          >
            Reset Password
          </Heading>
          <Label htmlFor="password">New Password</Label>
          <Input
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            mb={3}
          />
          {error && (
            <Text
              sx={{
                textAlign: "center",
                color: "red",
                maxWidth: "270px",
                pb: 3,
              }}
            >
              {error}
            </Text>
          )}
          <Button
            variant="large"
            sx={{ width: "100%", mt: 2 }}
            disabled={isSubmitting}
            type="submit"
          >
            Save Password
          </Button>
        </Card>
      )}
    </Flex>
  )
}
