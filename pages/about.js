import React from "react"
import withSession from "../lib/session"
import Wrapper from "../components/layout/Wrapper"
import appConfig from "../app.config"
import AboutView from "../components/views/About"

const About = (props) => (
  <Wrapper
    url="/"
    title={appConfig.name + " | About"}
    description={"More information about " + appConfig.name}
    bg="primary"
    user={props.user}
  >
    <AboutView />
  </Wrapper>
)

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user")

  if (user === undefined) {
    res.setHeader("location", "/login")
    res.statusCode = 302
    res.end()
    return
  } else {
    const user = req.session.get("user")
    return { props: { user } }
  }
})

export default About
