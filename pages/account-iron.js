import React from "react"
import withSession from "../lib/session"
import PropTypes from "prop-types"
import getPlan from "../utils/firebase/getPlan"

const Account = ({ user, plan }) => {
  console.log(user)
  return (
    <>
      <div>email: {user.email}</div>
      <div>id: {user.uid}</div>
      <div>plan: {JSON.stringify(plan)}</div>
    </>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user")

  if (user === undefined) {
    res.setHeader("location", "/login")
    res.statusCode = 302
    res.end()
    return
  } else {
    const user = req.session.get("user")
    return await getPlan(user.uid).then((plan) => {
      return { props: { user, plan } }
    })
  }
})

export default Account
