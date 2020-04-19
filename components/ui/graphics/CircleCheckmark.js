import { Box } from "theme-ui"

export default (props) => (
  <Box
    sx={{
      color: props.color || "primary",
      pr: "1px",
      fontWeight: 900,
      fontSize: 4,
      display: "inline-block",
      transform: "rotate(-6deg)",
      borderRadius: "50%",
      borderColor: props.color || "primary",
      border: "4px solid",
      width: "42px",
      height: "42px",
      mt: -3,
      mb: 2,
    }}
  >
    ✓
  </Box>
)
