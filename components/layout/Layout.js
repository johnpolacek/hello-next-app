import React, { useContext, useEffect } from "react"
import PropTypes from "prop-types"
import Head from "./Head"
import Style from "./Style"
import { Flex } from "theme-ui"
import { UserContext } from "../context/UserContext"
import Header from "../ui/containers/Header"
import Main from "../ui/containers/Main"
import Footer from "../ui/containers/Footer"

const Layout = (props) => {
  const { setUser } = useContext(UserContext)

  useEffect(() => {
    setUser(props.user ? props.user : false)
  }, [props.user])

  return (
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
}

Layout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  user: PropTypes.object,
}

export default Layout
