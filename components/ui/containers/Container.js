import { Box } from "theme-ui"

export default (props) => {
  return (
    <Box
      sx={{
        maxWidth: props.width + "px",
        mx: "auto",
        p: 5,
        mb: 5,
        alignItems: "center",
        borderRadius: "4px",
      }}
      variant={props.variant}
      {...props}
    />
  )
}
