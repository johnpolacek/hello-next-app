import React from "react"
import withSession from "../lib/session.js"
import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import { MDXProvider } from "@mdx-js/react"
import PrivacyContent from "../components/markdown/privacy.mdx"
import Container from "../components/ui/containers/Container"

const Privacy = (props) => (
  <Wrapper
    url="/privacy"
    title={appConfig.name + " | Privacy Policy"}
    description={"Privacy policy information for " + appConfig.name + " users"}
    user={props.user}
  >
    <MDXProvider>
      <Container id="privacy" width={960}>
        <PrivacyContent />
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

export default Privacy
