import { Box, Heading, Text } from "theme-ui"
import Link from "next/link"
import ButtonLink from "../ui/nav/ButtonLink"
import appConfig from "../../app.config"

export default (props) => (
  <Box sx={{ textAlign: "center", width: "100%", color: "white", pb: 5 }}>
    {props.isSignedIn ? (
      <Text color="primary">Signed In View = Show App</Text>
    ) : (
      <>
        <Heading as="h1" variant="headline">
          {appConfig.headline}
        </Heading>
        <Heading as="h2" variant="subhead">
          {appConfig.subhead}
        </Heading>
        <Box>
          <Box sx={{ display: "inline-block", mx: 3 }}>
            <ButtonLink fontSize={4} bg="red" href="/signup">
              Get Started
            </ButtonLink>
          </Box>
          <Box sx={{ display: "inline-block", mx: 3 }}>
            <ButtonLink fontSize={4} bg="white" href="/demo">
              View Demo
            </ButtonLink>
          </Box>
        </Box>
      </>
    )}
  </Box>
)
