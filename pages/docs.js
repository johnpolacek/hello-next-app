import React from "react"
import withSession from "../lib/session"
import { MDXProvider } from "@mdx-js/react"
import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import Container from "../components/ui/containers/Container"
import DocsContent from "../README.md"

const Docs = (props) => (
  <Wrapper
    url="/docs"
    title={appConfig.name + " | Docs"}
    description={"Technical documentation for " + appConfig.name}
  >
    <MDXProvider>
      <Container id="docs">
        <DocsContent />
      </Container>
    </MDXProvider>
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
    return { props: { user }}
  }
})

export default Docs
