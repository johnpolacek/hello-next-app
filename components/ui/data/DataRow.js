import React, { useState } from "react"
import { Flex, Box, Text, Button, Label, Input } from "theme-ui"

export default (props) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Flex
      sx={{
        bg: "rgba(255, 255, 255, 0.1)",
        maxWidth: "540px",
        width: "96%",
        mx: "auto",
        mb: "2px",
      }}
    >
      <Box sx={{ width: "30%", p: 3, textAlign: "right" }}>
        <Label sx={{ p: 1 }} htmlFor={props.name}>
          {props.label}
        </Label>
      </Box>
      <Box
        sx={{
          width: "50%",
          p: 3,
          textAlign: "left",
          bg: "rgba(255, 255, 255, 0.1)",
        }}
      >
        {isEditing ? (
          <Input
            name={props.name}
            value={props.value}
            sx={{
              fontSize: 1,
              color: "black",
              py: 1,
              px: 2,
              m: 0,
            }}
            type="text"
          />
        ) : (
          <Box sx={{ p: 1 }}>{props.children || props.value}</Box>
        )}
      </Box>
      <Box
        sx={{
          width: "20%",
          p: 3,
          textAlign: "right",
          bg: "rgba(255, 255, 255, 0.1)",
          fontSize: 0,
        }}
      >
        <Button
          onClick={() => {
            setIsEditing(true)
          }}
          sx={{
            py: 2,
            bg: isEditing ? "secondary" : "transparent",
            fontSize: 0,
          }}
        >
          {isEditing ? "save" : "update"}
        </Button>
      </Box>
    </Flex>
  )
}
