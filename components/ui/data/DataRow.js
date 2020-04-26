import { Flex, Box, Text } from "theme-ui"

export default (props) => (
  <Flex
    sx={{
      bg: "rgba(255, 255, 255, 0.1)",
      maxWidth: "480px",
      width: "33.33%",
      mx: "auto",
      mb: "2px",
    }}
  >
    <Box sx={{ width: "40%", p: 3, textAlign: "right" }}>{props.label}</Box>
    <Box
      sx={{
        width: "66.66%",
        p: 3,
        textAlign: "left",
        bg: "rgba(255, 255, 255, 0.1)",
      }}
    >
      {props.children}
    </Box>
  </Flex>
)
