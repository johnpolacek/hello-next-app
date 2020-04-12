import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash/object"
import withAuthUser from "../utils/context/withAuthUser"
import withAuthUserInfo from "../utils/context/withAuthUserInfo"
import ResetView from "../components/views/Reset"
import appConfig from "../app.config"

import Wrapper from "../components/layout/Wrapper"
// Note: It is recommended for SEO that you have a different title and description for each page

const Reset = (props) => {
  const { AuthUserInfo } = props
  const AuthUser = get(AuthUserInfo, "AuthUser", null)

  const isSignedIn = AuthUserInfo && AuthUserInfo.AuthUser != null

  return (
    <Wrapper
      url="/"
      title={appConfig.name + " | " + appConfig.shortDescription}
      description={appConfig.longDescription}
      bg="primary"
    >
      <ResetView isSignedIn={isSignedIn} />
    </Wrapper>
  )
}

Reset.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired,
    }),
  }),
}

Reset.defaultProps = {
  AuthUserInfo: null,
}

// Use `withAuthUser` to get the authed user server-side, which
// disables static rendering.
// Use `withAuthUserInfo` to include the authed user as a prop
// to your component.
export default withAuthUser(withAuthUserInfo(Reset))
