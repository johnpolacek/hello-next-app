import { Flex, Box, Text, Link, Image } from "theme-ui"
import { shade } from "@theme-ui/color"
import appConfig from "../../../app.config.js"

export default (props) => (
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
        maxWidth: "1280px",
        mx: "auto",
      }}
    >
      <Box sx={{ width: "33.33%", px: 3 }}>
        <Text sx={{ fontWeight: 600, fontSize: 3, pb: 2 }}>
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
        <Text sx={{ fontSize: 0 }}>{appConfig.company.description}</Text>
      </Box>
    </Flex>
  </Box>
)
