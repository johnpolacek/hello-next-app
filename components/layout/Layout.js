/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import Head from "./Head"
import Style from "./Style"
import { Flex } from "theme-ui"
import Header from "../ui/containers/Header"
import Main from "../ui/containers/Main"
import Footer from "../ui/containers/Footer"

const Layout = (props) => (
  <>
    <Head {...props} />

    <Flex
      sx={{
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <Header />
      <Main>{props.children}</Main>
      <Footer />
    </Flex>

    <Style />
  </>
)

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
}

export default Layout
