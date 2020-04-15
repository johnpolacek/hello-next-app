import { ThemeProvider } from "theme-ui"
import Layout from "./Layout"
import theme from "../theme"
import appConfig from "../../app.config.js"
import ReactGA from "react-ga"

export default (props) => {
  if (
    typeof appConfig.analytics !== "undefined" &&
    appConfig.analytics.indexOf("UA") === 0
  ) {
    ReactGA.initialize(appConfig.analytics)
    ReactGA.set({ anonymizeIp: true })
    if (typeof window !== "undefined") {
      ReactGA.pageview(window.location.pathname)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Layout {...props} />
    </ThemeProvider>
  )
}
