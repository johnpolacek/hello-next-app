import { Box, Heading, Text } from "theme-ui"
import Link from "next/link"
import ButtonLink from "../ui/nav/ButtonLink"
import appConfig from "../../app.config"

export default (props) => (
  <Box sx={{ textAlign: "center", width: "100%", color: "white" }}>
    <Heading as="h1">{appConfig.name} Tour</Heading>
    <iframe
      src="https://player.vimeo.com/video/330041609"
      width="800"
      height="420"
      frameborder="0"
      allow="autoplay; fullscreen"
      allowfullscreen
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
