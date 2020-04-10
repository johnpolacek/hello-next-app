import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import Docs from "../components/views/Docs"
import appConfig from "../app.config"

export default () => (
  <Wrapper
    url="/docs"
    title={appConfig.name + " | Docs"}
    description="Project Starter Docs for building Web Apps with Next.js, Theme UI, Cypress"
  >
    <Docs />
  </Wrapper>
)
