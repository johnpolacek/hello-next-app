import React from "react"
import withSession from "../lib/session"
import { MDXProvider } from "@mdx-js/react"
import { Box } from "theme-ui"
import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import Container from "../components/ui/containers/Container"
import DocsContent from "../README.md"

const Docs = (props) => (
  <Wrapper
    url="/docs"
    title={appConfig.name + " | Docs"}
    description={"Technical documentation for " + appConfig.name}
    user={props.user}
  >
    <MDXProvider>
      <Container id="docs" width="960" variant="container.lite">
        <DocsContent />
      </Container>
    </MDXProvider>
  </Wrapper>
)

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user")

  if (user === undefined) {
    return { props: { user: null } }
  } else {
    const user = req.session.get("user")
    return { props: { user } }
  }
})

export default Docs
