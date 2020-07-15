import NextLink from "next/link"
import { Flex, Box, Text, Link, Image } from "theme-ui"
import { shade } from "@theme-ui/color"
import appConfig from "../../../app.config.js"
import { SocialIcon } from "react-social-icons"

const Footer = (props) => (
  <Box
    as="footer"
    sx={{
      color: "white",
      textAlign: "left",
      fontSize: 3,
      bg: shade("primary", 0.2),
    }}
  >
    <Flex
      sx={{
        pt: 4,
        pb: 5,
        px: 4,
        flexWrap: "wrap",
        maxWidth: "1100px",
        mx: "auto",
      }}
    >
      <Box sx={{ width: "40%", px: 4 }}>
        <Text sx={{ fontWeight: 600, fontSize: 3, pb: 2, pr: 3 }}>
          <span
            sx={{
              pr: "12px",
              position: "relative",
              top: "6px",
              color: "primary",
            }}
          >
            <Image
              width="20"
              height="20"
              src="/logo-app.svg"
              alt={appConfig.name + " Logo"}
              sx={{ position: "relative", top: "3px" }}
            />
          </span>
          <Text as="span" sx={{ pl: 2 }}>
            {appConfig.company.name}
          </Text>
        </Text>
        <Text sx={{ fontSize: 1 }}>{appConfig.company.description}</Text>
      </Box>
      <Box sx={{ width: "20%", px: 4 }}>
        <NextLink href="./about" passHref>
          <Link variant="footer">About</Link>
        </NextLink>
        <NextLink href="./docs" passHref>
          <Link variant="footer">Documentation</Link>
        </NextLink>
        <NextLink href="./plans" passHref>
          <Link variant="footer">Pricing</Link>
        </NextLink>
        <NextLink href="./privacy" passHref>
          <Link variant="footer">Privacy Policy</Link>
        </NextLink>
        <NextLink href="./terms" passHref>
          <Link variant="footer">Terms of Service</Link>
        </NextLink>
      </Box>
      <Box sx={{ width: "40%", px: 4 }}>
        {appConfig.social.map((url, i) => (
          <Box key={"socialLink" + i} sx={{ display: "inline-block", pr: 2 }}>
            <SocialIcon
              fgColor="#fff"
              bgColor="rgba(0,0,0,.1)"
              style={{ height: 36, width: 36 }}
              url={url}
            />
          </Box>
        ))}
      </Box>
    </Flex>
  </Box>
)

export default Footer
