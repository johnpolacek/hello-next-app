import { Box, Heading, Text } from "theme-ui"
import Link from "next/link"
import ButtonLink from "../ui/nav/ButtonLink"
import appConfig from "../../app.config"

export default (props) => (
  <Box sx={{ textAlign: "center", width: "100%", color: "white" }}>
    {props.isSignedIn ? (
      <Text color="primary">Signed In View = Show App</Text>
    ) : (
      <>
        <Heading as="h1" sx={{ fontSize: 7, pb: 4 }}>
          {appConfig.headline}
        </Heading>
        <Heading
          as="h2"
          sx={{
            fontSize: 5,
            fontWeight: "lite",
            pb: 6,
            px: 3,
            maxWidth: "1000px",
            mx: "auto",
          }}
        >
          {appConfig.subhead}
        </Heading>
        <Box>
          <Box sx={{ display: "inline-block", mx: 3 }}>
            <ButtonLink fontSize={4} bg="red" href="/signup">
              Get Started
            </ButtonLink>
          </Box>
          <Box sx={{ display: "inline-block", mx: 3 }}>
            <ButtonLink fontSize={4} bg="white" href="/tour">
              Take a Tour
            </ButtonLink>
          </Box>
        </Box>
      </>
    )}
  </Box>
)
