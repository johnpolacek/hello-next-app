import updateAuthUserProperty from "../../lib/firebase/admin/updateAuthUserProperty"

const updatePassword = async (req, res) => {
  const { token, password } = req.body

  try {
    const data = await updateAuthUserProperty(token, "password", password)
    return res.status(200).json({ data })
  } catch (error) {
    return res.status(401).json({ result: "error" }, error)
  }
}

export default updatePassword
