import React, { useState } from "react"
import reset from "../../../lib/firebase/reset"
import Form from "./Form"
import { Label, Input } from "theme-ui"

const ForgotPasswordForm = (props) => {
  const [email, setEmail] = useState("")

  const handleSubmit = async () => {
    await reset(email)
    props.onComplete()
  }

  return (
    <Form
      onSubmit={handleSubmit}
      heading="Password Reset"
      buttonText="Request Password Reset"
      id="ForgotPasswordForm"
    >
      <Label htmlFor="email">Enter your email</Label>
      <Input
        name="email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
    </Form>
  )
}

export default ForgotPasswordForm
