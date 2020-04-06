import React from "react"
import Link from "next/link"
import Wrapper from "../components/layout/Wrapper"
import withAuthUser from "../utils/context/withAuthUser"
import withAuthUserInfo from "../utils/context/withAuthUserInfo"

const About = (props) => (
  <Wrapper
    url="/"
    title="Hello Web App | About"
    description="More information about the Hello Web App project"
  >
    <p>
      This page is static because it does not fetch any data or include the
      authed user info.
    </p>
  </Wrapper>
)

export default withAuthUser(withAuthUserInfo(About))
