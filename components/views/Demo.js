import appConfig from "../../app.config"
import { Box, Heading, Text } from "theme-ui"
import Link from "next/link"
import ButtonLink from "../ui/nav/ButtonLink"

const Demo = (props) => (
  <Box sx={{ textAlign: "center", width: "100%", color: "white", pb: 5 }}>
    <Heading as="h1">{appConfig.name} Demo</Heading>
    <iframe
      src={appConfig.demo}
      width="800"
      height="420"
      frameBorder="0"
      allow="autoplay; fullscreen"
      allowFullScreen
    ></iframe>
    <Heading sx={{ py: 4, maxWidth: "600px", mx: "auto" }} variant="subhead">
      Put a video walkthrough or product tour content here, then include another
      sign up button.
    </Heading>
    <ButtonLink fontSize={4} bg="red" href="/signup">
      Get Started
    </ButtonLink>
  </Box>
)

export default Demo
