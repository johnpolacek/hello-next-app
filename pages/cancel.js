import React from "react"
import PropTypes from "prop-types"
import { get } from "lodash/object"
import withAuthUser from "../utils/context/withAuthUser"
import withAuthUserInfo from "../utils/context/withAuthUserInfo"
import appConfig from "../app.config"
import Wrapper from "../components/layout/Wrapper"
import Cancel from "../components/views/Cancel"
import getPlan from "../utils/firebase/getPlan"

const Page = (props) => {
  const AuthUser = get(props.AuthUserInfo, "AuthUser", null)

  return (
    <Wrapper
      url="/"
      title={appConfig.name + " | Cancel"}
      description={"Your " + appConfig.name + " account information"}
      bg="primary"
    >
      {AuthUser && <Cancel {...props} />}
    </Wrapper>
  )
}

Page.getInitialProps = async (ctx) => {
  // Get the AuthUserInfo object. This is set in `withAuthUser.js`.
  // The AuthUserInfo object is available on both the server and client.
  const AuthUserInfo = get(ctx, "myCustomData.AuthUserInfo", null)
  const AuthUser = get(AuthUserInfo, "AuthUser", null)

  // You can fetch data here.
  return await getPlan(AuthUser.id).then((plan) => {
    return { plan: plan }
  })
}

// Use `withAuthUser` to get the authed user server-side, which
// disables static rendering.
// Use `withAuthUserInfo` to include the authed user as a prop
// to your component.
export default withAuthUser(withAuthUserInfo(Page))
