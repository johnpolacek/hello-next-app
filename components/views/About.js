import { Box, Heading, Text } from "theme-ui"
import Link from "next/link"
import ButtonLink from "../ui/nav/ButtonLink"
import appConfig from "../../app.config"

const About = (props) => (
  <Box sx={{ textAlign: "center", width: "100%", color: "white" }}>
    <Heading variant="headline">About {appConfig.name}</Heading>
    <Heading variant="subhead">
      The About Page is the place where you can talk about the reason your app
      exists. Let people know about the motivation behind the app so they can
      better decide if it is right for them.
    </Heading>
  </Box>
)

export default About
