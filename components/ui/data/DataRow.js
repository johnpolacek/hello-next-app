import React, { useState } from "react"
import { Flex, Box, Text, Button, Label, Input } from "theme-ui"
import Router from "next/router"

export default (props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [dataValue, setDataValue] = useState(props.value)

  const onSaveComplete = () => {
    setIsEditing(false)
    setIsSaving(false)
  }

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
            value={dataValue}
            type={props.type || "text"}
            onChange={(e) => {
              setDataValue(e.target.value)
            }}
            sx={{
              fontSize: 1,
              color: "black",
              py: 1,
              px: 2,
              m: 0,
            }}
          />
        ) : (
          <Box sx={{ p: 1 }}>{props.children || dataValue}</Box>
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
            if (props.link) {
              Router.push(props.link)
            } else {
              if (isEditing && !isSaving) {
                setIsSaving(true)
                props.onSave(dataValue, onSaveComplete)
              } else {
                setIsEditing(true)
              }
            }
          }}
          sx={{
            py: 2,
            bg: isEditing ? (isSaving ? "gray" : "secondary") : "white",
            fontSize: 0,
            color: "white",
          }}
        >
          {isEditing ? "save" : "update"}
        </Button>
      </Box>
    </Flex>
  )
}
