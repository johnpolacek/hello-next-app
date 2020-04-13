import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import { MDXProvider } from "@mdx-js/react"
import Docs from "../components/markdown/docs.mdx"

export default () => (
  <Wrapper
    url="/docs"
    title={appConfig.name + " | Docs"}
    description={"Technical documentation for " + appConfig.name}
  >
    <MDXProvider>
      <Docs />
    </MDXProvider>
  </Wrapper>
)
