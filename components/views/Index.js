import { Box, Heading, Text } from "theme-ui"
import Link from "next/link"
import ButtonLink from "../ui/nav/ButtonLink"

export default (props) => (
  <Box sx={{ textAlign: "center", width: "100%", pb: 6 }}>
    <Heading as="h2" sx={{ fontSize: 8, fontWeight: "lite", pb: 4 }}>
      Hello!
    </Heading>
    {props.isSignedIn ? (
      <Text>You're signed in.</Text>
    ) : (
      <>
        <p sx={{ pb: 2 }}>You’re not signed in yet...</p>
        <Box>
          <Box sx={{ display: "inline-block", mx: 2 }}>
            <Link href="/signin">
              <ButtonLink href="/signin">Sign in to Your Account</ButtonLink>
            </Link>
          </Box>
          <Box sx={{ display: "inline-block", mx: 2 }}>
            <Link href="/signup">
              <ButtonLink href="/signin">Create New Account</ButtonLink>
            </Link>
          </Box>
        </Box>
      </>
    )}
  </Box>
)
