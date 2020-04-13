import { Flex } from "theme-ui"

export default (props) => {
  return (
    <Flex
      as="main"
      sx={{
        flex: 1,
        px: [3, 4],
        py: 4,
        alignItems: "center",
        bg: props.bg || "transparent",
      }}
      {...props}
    />
  )
}
