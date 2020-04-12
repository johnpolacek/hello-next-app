import React, { useState } from "react"
import PropTypes from "prop-types"
import reset from "../../../utils/auth/reset"
import { Flex, Box, Card, Heading, Text, Button } from "theme-ui"

const Form = (props) => {
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)
    try {
      props.onSubmit()
    } catch (err) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  return (
    <Flex sx={{ justifyContent: "center", width: "100%" }}>
      <Card as="form" sx={{ bg: "white" }} onSubmit={handleSubmit}>
        {props.heading && (
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
            {props.heading}
          </Heading>
        )}
        {props.children}
        <Button
          variant="large"
          sx={{ width: "100%", mt: 2 }}
          disabled={isSubmitting}
          type="submit"
        >
          {props.buttonText}
        </Button>
        {props.after}
      </Card>
    </Flex>
  )
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  after: PropTypes.object,
  heading: PropTypes.string,
}

export default Form
