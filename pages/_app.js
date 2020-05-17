import { ThemeProvider } from "theme-ui"
import { UserProvider } from "../components/context/UserContext"
import theme from "../components/theme"
import ReactGA from "react-ga"
import appConfig from "../app.config"

function MyApp({ Component, pageProps }) {
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
      <UserProvider user={pageProps.user}>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  )
}

export default MyApp
