import React from "react"
import Link from "next/link"
import Wrapper from "../components/layout/Wrapper"
import withAuthUser from "../utils/context/withAuthUser"
import withAuthUserInfo from "../utils/context/withAuthUserInfo"
import appConfig from "../app.config"

const About = (props) => (
  <Wrapper
    url="/"
    title={appConfig.name + " | About"}
    description="More information about the Hello Web App project"
  >
    <p>
      This page is static because it does not fetch any data or include the
      authed user info.
    </p>
  </Wrapper>
)

export default withAuthUser(withAuthUserInfo(About))
