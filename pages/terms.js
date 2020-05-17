import React from "react"
import withSession from "../lib/session"
import appConfig from "../app.config"
import Layout from "../components/layout/Layout"
import { MDXProvider } from "@mdx-js/react"
import TermsContent from "../components/markdown/terms.mdx"
import Container from "../components/ui/containers/Container"

const Terms = (props) => (
  <Layout
    url="/terms"
    title={appConfig.name + " | Terms of Service"}
    description={"Terms of service for the usage of " + appConfig.name}
    user={props.user}
  >
    <MDXProvider>
      <Container id="terms" width={960}>
        <TermsContent />
      </Container>
    </MDXProvider>
  </Layout>
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

export default Terms
