import Router from "next/router"
import NavHome from "./NavHome"
import NavLink from "./NavLink"
import logout from "../../../utils/firebase/logout"
import useUser from "../../../lib/hooks/useUser"
import { Flex, Box, Button } from "theme-ui"

const Nav = (props) => {
  // const { user, mutateUser } = useUser()
  const user = false
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
                try {
                  await logout()
                  Router.push("/login")
                } catch (e) {
                  console.error(e)
                }
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
