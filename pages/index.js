import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash/object"
import withAuthUser from "../utils/context/withAuthUser"
import withAuthUserInfo from "../utils/context/withAuthUserInfo"
import IndexView from "../components/views/Index"

import Wrapper from "../components/layout/Wrapper"
// Note: It is recommended for SEO that you have a different title and description for each page

const Index = (props) => {
  const { AuthUserInfo } = props
  const AuthUser = get(AuthUserInfo, "AuthUser", null)

  return (
    <Wrapper
      url="/"
      title="Hello Next App | Next.js Web App Project Template"
      description="React Web App Project Template for building application websites with the Next.js Framework, a Firebase Serverless Backend, Theme UI Components and more."
    >
      <IndexView isSignedIn={AuthUserInfo && AuthUserInfo.AuthUser != null} />
    </Wrapper>
  )
}

Index.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired,
    }),
  }),
}

Index.defaultProps = {
  AuthUserInfo: null,
}

// Use `withAuthUser` to get the authed user server-side, which
// disables static rendering.
// Use `withAuthUserInfo` to include the authed user as a prop
// to your component.
export default withAuthUser(withAuthUserInfo(Index))
