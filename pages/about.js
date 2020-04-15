import React from "react"
import Link from "next/link"
import Wrapper from "../components/layout/Wrapper"
import appConfig from "../app.config"
import About from "../components/views/About"

export default (props) => (
  <Wrapper
    url="/"
    title={appConfig.name + " | About"}
    description={"More information about " + appConfig.name}
    bg="primary"
  >
    <About />
  </Wrapper>
)
