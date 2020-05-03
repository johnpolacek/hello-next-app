import React from 'react'
import withSession from '../lib/session'
import PropTypes from 'prop-types'

const Account = ({ user }) => {
  return (
    <div>{user.email}</div>
  )
}

export const getServerSideProps = withSession(async function({ req, res }) {
  const user = req.session.get('user')

  if (user === undefined) {
    res.setHeader('location', '/login')
    res.statusCode = 302
    res.end()
    return
  }

  return {
    props: { user: req.session.get('user') },
  }
})

export default Account