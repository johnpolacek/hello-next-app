import { Box } from "theme-ui"

export default (props) => (
  <Box
    sx={{
      mt: "-12px",
      mb: "-16px",
    }}
  >
    <img width="48" height="48" src="/spinner.svg" alt="Processing request" />
  </Box>
)
