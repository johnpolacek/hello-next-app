import React, { useState } from "react"
import reset from "../../../utils/auth/reset"
import { Flex, Box, Card, Heading, Text, Label, Input, Button } from "theme-ui"

export default (props) => {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)
    try {
      await reset(email)
      props.onComplete()
    } catch (err) {
      setError(err.message)
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
          Password Reset
        </Heading>
        <Label htmlFor="email">Enter your email</Label>
        <Input
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
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
          Request Password Reset
        </Button>
      </Card>
    </Flex>
  )
}
