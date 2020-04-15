import { MDXProvider } from "@mdx-js/react"
import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import Container from "../components/ui/containers/Container"
import Docs from "../README.md"

export default () => (
  <Wrapper
    url="/docs"
    title={appConfig.name + " | Docs"}
    description={"Technical documentation for " + appConfig.name}
  >
    <MDXProvider>
      <Container id="docs">
        <Docs />
      </Container>
    </MDXProvider>
  </Wrapper>
)
