import { Box, Heading, Text } from "theme-ui"
import Link from "next/link"
import ButtonLink from "../ui/nav/ButtonLink"
import appConfig from "../../app.config"

const About = (props) => (
  <Box sx={{ textAlign: "center", width: "100%", color: "white" }}>
    <Heading variant="headline">{appConfig.name} Store</Heading>
    <Heading variant="subhead">
      This is where you can list items available for purchase.
    </Heading>
  </Box>
)

export default About
