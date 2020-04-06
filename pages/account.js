import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash/object"
import withAuthUser from "../utils/context/withAuthUser"
import withAuthUserInfo from "../utils/context/withAuthUserInfo"
import logout from "../utils/auth/logout"

import Wrapper from "../components/layout/Wrapper"
// Note: It is recommended for SEO that you have a different title and description for each page

const Index = (props) => {
  const { AuthUserInfo, data } = props
  const AuthUser = get(AuthUserInfo, "AuthUser", null)
  const { favoriteFood } = data

  return (
    <Wrapper
      url="/"
      title="Hello Web App | Account"
      description="Your Hello Web App account information"
    >
      <p>Hi there!</p>
      {AuthUser && (
        <div>
          <pre>
            <code>{JSON.stringify(AuthUser, null, 2)}</code>
          </pre>
          <div>
            <div>Your favorite food is {favoriteFood}.</div>
          </div>
        </div>
      )}
    </Wrapper>
  )
}

// Just an example.
const mockFetchData = async (userId) => ({
  user: {
    ...(userId && {
      id: userId,
    }),
  },
  favoriteFood: "pizza",
})

Index.getInitialProps = async (ctx) => {
  // Get the AuthUserInfo object. This is set in `withAuthUser.js`.
  // The AuthUserInfo object is available on both the server and client.
  const AuthUserInfo = get(ctx, "myCustomData.AuthUserInfo", null)
  const AuthUser = get(AuthUserInfo, "AuthUser", null)

  // You can also get the token (e.g., to authorize a request when fetching data)
  // const AuthUserToken = get(AuthUserInfo, 'token', null)

  // You can fetch data here.
  const data = await mockFetchData(get(AuthUser, "id"))

  return {
    data,
  }
}

Index.displayName = "Index"

Index.propTypes = {
  AuthUserInfo: PropTypes.shape({
    AuthUser: PropTypes.shape({
      id: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      emailVerified: PropTypes.bool.isRequired,
    }),
    token: PropTypes.string,
  }),
  data: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
    favoriteFood: PropTypes.string.isRequired,
  }).isRequired,
}

Index.defaultProps = {
  AuthUserInfo: null,
}

// Use `withAuthUser` to get the authed user server-side, which
// disables static rendering.
// Use `withAuthUserInfo` to include the authed user as a prop
// to your component.
export default withAuthUser(withAuthUserInfo(Index))
