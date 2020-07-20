import { Box, Heading, Text } from "theme-ui"
import Link from "next/link"
import ButtonLink from "../ui/nav/ButtonLink"
import appConfig from "../../app.config"

const Index = (props) => (
  <Box sx={{ textAlign: "center", width: "100%", color: "white", py: 5 }}>
    {props.isSignedIn ? (
      <Text as="p">Signed In View of App</Text>
    ) : (
      <>
        <Heading as="h1" variant="headline">
          {appConfig.headline}
        </Heading>
        <Heading as="h2" variant="subhead">
          {appConfig.subhead}
        </Heading>
        <Box sx={{ pb: 5 }}>
          <Box sx={{ display: "inline-block", mx: 3 }}>
            <ButtonLink fontSize={4} bg="secondary" href="/signup">
              Create Account
            </ButtonLink>
          </Box>
          {appConfig.gumroad && (
            <Box sx={{ display: "inline-block", mx: 3, position: "relative" }}>
              <script src="https://gumroad.com/js/gumroad.js"></script>
              <a
                style={{
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                }}
                className="gumroad-button"
                href="https://gum.co/vUpFK"
              >
                Download
              </a>
              <ButtonLink fontSize={4} bg="secondary" href="#" download>
                Download
              </ButtonLink>
            </Box>
          )}
          {appConfig.demo && (
            <Box sx={{ display: "inline-block", mx: 3 }}>
              <ButtonLink fontSize={4} bg="white" href={appConfig.demo.includes("vimeo") ? "/demo" : appConfig.demo}>
                View Demo
              </ButtonLink>
            </Box>
          )}
        </Box>
      </>
    )}
  </Box>
)

export default Index
