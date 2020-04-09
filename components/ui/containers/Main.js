import { Flex } from "theme-ui"
import React, { useContext, useEffect } from "react"

export default (props) => {
  return (
    <Flex
      as="main"
      sx={{
        flex: 1,
        px: [3, 4],
        pb: 4,
        alignItems: "center",
        borderBottom: "solid 1px",
        borderTop: "solid 1px",
        borderColor: "#EEE",
      }}
      {...props}
    />
  )
}
