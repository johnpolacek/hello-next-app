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
        .signInWithEmailAndPassword(email, password)
      Router.push("/")
    } catch (err) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  return (
    <Flex sx={{ justifyContent: "center", width: "100%" }}>
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
          Login to your Account
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
        <Box sx={{ pb: 4 }}>
          <Link href="/forgot" passHref>
            <a>Forgot password?</a>
          </Link>
        </Box>
        {error && <Text sx={{ color: "red" }}>{error}</Text>}
        <Button
          variant="large"
          sx={{ width: "100%" }}
          disabled={isSubmitting}
          type="submit"
        >
          Login
        </Button>
        <Text sx={{ pt: 4, width: "100%", textAlign: "center" }}>
          Don’t have an account?{" "}
          <Link href="/signup" passHref>
            <a>Sign Up</a>
          </Link>
        </Text>
      </Card>
    </Flex>
  )
}
