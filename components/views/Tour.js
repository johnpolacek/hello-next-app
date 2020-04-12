import { Box, Heading, Text } from "theme-ui"
import Link from "next/link"
import ButtonLink from "../ui/nav/ButtonLink"
import appConfig from "../../app.config"

export default (props) => (
  <Box sx={{ textAlign: "center", width: "100%", color: "white" }}>
    <Heading as="h1" sx={{ fontSize: 7, pb: 4 }}>
      Product Tour
    </Heading>
  </Box>
)
