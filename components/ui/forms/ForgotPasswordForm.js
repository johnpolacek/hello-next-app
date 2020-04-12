import React, { useState } from "react"
import reset from "../../../utils/auth/reset"
import Form from "./Form"
import { Label, Input } from "theme-ui"

export default (props) => {
  const [email, setEmail] = useState("")

  const handleSubmit = async (e) => {
    await reset(email)
    props.onComplete()
  }

  return (
    <Form
      onSubmit={handleSubmit}
      heading="Password Reset"
      buttonText="Request Password Reset"
    >
      <Label htmlFor="email">Enter your email</Label>
      <Input
        name="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        mb={3}
      />
    </Form>
  )
}
