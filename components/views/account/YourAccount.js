import { Box, Heading, Text } from "theme-ui"
import Link from "next/link"

export default (props) => (
  <Box sx={{ textAlign: "center", width: "100%", color: "white", pb: 5 }}>
    <Heading variant="headline">Your Account</Heading>
    <p>Email {props.email}</p>
    <pre>
      <code>{JSON.stringify(props.data, null, 2)}</code>
    </pre>
  </Box>
)
