import withSession from "../../lib/session"

export default withSession(async (req, res) => {
  const { user } = await req.body

  try {
    req.session.set("user", {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified,
    })
    await req.session.save()
    res.json(user)
  } catch (error) {
    console.error(error)
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500)
    res.json(error.data)
  }
})
