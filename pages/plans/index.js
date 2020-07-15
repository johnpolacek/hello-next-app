import Layout from "../../components/layout/Layout"
import appConfig from "../../app.config"
import ChoosePlan from "../../components/ui/plans/ChoosePlan"

const PlansPage = () => (
  <Layout
    url="/"
    title={appConfig.name + " | Plans"}
    description={"Choose the right " + appConfig.name + " plan for you"}
    bg="primary"
  >
    <ChoosePlan />
  </Layout>
)

export default PlansPage
