import withSession from "../../lib/session"
import updateUserProperty from "../../lib/firebase/admin/updateUserProperty"

const updateEmail = withSession(async (req, res) => {
  const { token, email } = req.body
  let user = req.session.get("user")

  try {
    const data = await updateUserProperty(token, "email", email)
    user.email = email
    req.session.set("user", user)
    await req.session.save()
    return res.status(200).json({ data })
  } catch (error) {
    console.log("error", error)
    return res.status(401).json({ result: "error" }, error)
  }
})

export default updateEmail
