/** @jsx jsx */
import { jsx } from "theme-ui"
import Router from "next/router"
import NavHome from "./NavHome"
import NavLink from "./NavLink"
import GithubLink from "./GithubLink"
import logout from "../../../utils/auth/logout"
import withAuthUserInfo from "../../../utils/context/withAuthUserInfo"
import { Flex, Box, Button } from "theme-ui"

const Nav = (props) => {
  return (
    <Flex as="nav" sx={{ flexWrap: "wrap", py: [2, 0] }}>
      <Box
        sx={{
          width: ["100%", "50%"],
          pl: [0, 3],
          mt: -2,
          textAlign: ["center", "left"],
        }}
      >
        <NavHome />
      </Box>
      <Box
        sx={{
          width: ["100%", "50%"],
          textAlign: ["center", "right"],
          pr: [0, 3],
        }}
      >
        <NavLink href="/about">About</NavLink>
        {props.AuthUserInfo.AuthUser && (
          <>
            <NavLink href="/account">Account</NavLink>
            <Button
              sx={{
                bg: "white",
                color: "primary",
                fontWeight: 200,
                fontSize: 4,
              }}
              onClick={async () => {
                try {
                  await logout()
                  Router.push("/signin")
                } catch (e) {
                  console.error(e)
                }
              }}
            >
              Logout
            </Button>
          </>
        )}
        <GithubLink />
      </Box>
    </Flex>
  )
}

export default withAuthUserInfo(Nav)
