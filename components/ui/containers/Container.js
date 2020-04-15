import { Box } from "theme-ui"

export default (props) => {
  return (
    <Box
      sx={{
        maxWidth: "960px",
        mx: "auto",
        px: [3, 4],
        py: 5,
        alignItems: "center",
        bg: props.bg || "transparent",
      }}
      {...props}
    />
  )
}
