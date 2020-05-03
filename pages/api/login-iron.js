import fetch from '../../lib/fetch'
import withSession from '../../lib/session'

export default withSession(async (req, res) => {
  const { user } = await req.body
  
  try {
    console.log("login iron session user.email", user.email)
    req.session.set('user', user)
    await req.session.save()
    res.json(user)
  } catch (error) {
    console.log(error)
    const { response: fetchResponse } = error
    res.status(fetchResponse?.status || 500)
    res.json(error.data)
  }
})

