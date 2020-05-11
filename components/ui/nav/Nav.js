import React, { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import NavHome from "./NavHome"
import NavLink from "./NavLink"
import { Flex, Box, Button } from "theme-ui"
import Router from "next/router"

const Nav = () => {
  const { user } = useContext(UserContext)

  return (
    <Flex as="nav" sx={{ flexWrap: "wrap", py: [2, 0], bg: "primary" }}>
      <Box
        sx={{
          width: ["100%", "50%"],
          pl: [0, 3],
          mt: -2,
          textAlign: ["center", "left"],
        }}
      >
        <NavHome />
        <Box sx={{ pl: 3, display: "inline-block" }}>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/docs">Docs</NavLink>
        </Box>
      </Box>
      <Box
        sx={{
          width: ["100%", "50%"],
          textAlign: ["center", "right"],
          pr: [0, 3],
        }}
      >
        {user ? (
          <>
            <Button
              sx={{
                color: "white",
                fontWeight: "lite",
                fontSize: 3,
              }}
              onClick={async () => {
                await fetch("/api/logout")
                Router.push("/login")
              }}
            >
              Logout
            </Button>
            <NavLink href="/account">Account</NavLink>
          </>
        ) : (
          <>
            <NavLink href="/login">Login</NavLink>
            <NavLink href="/signup">
              <Button
                sx={{
                  bg: "rgba(0,0,0,.25)",
                  fontWeight: "lite",
                  color: "white",
                  px: 3,
                  py: 1,
                  my: -2,
                }}
              >
                Sign Up
              </Button>
            </NavLink>
          </>
        )}
      </Box>
    </Flex>
  )
}

export default Nav
