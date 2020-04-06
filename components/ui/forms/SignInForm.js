import React, { useState } from "react"
import Router from "next/router"
import firebase from "firebase/app"
import "firebase/auth"
import initFirebase from "../../../utils/auth/initFirebase"

// Init the Firebase app.
initFirebase()

export default () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)
    try {
      let result = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      Router.push("/")
    } catch (err) {
      setError(err.message)
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>Sign in to your account.</p>
      <div>
        <input
          placeholder="Email"
          name="email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        ></input>
      </div>
      <div>
        <input
          placeholder="Password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
        ></input>
      </div>
      <div>
        {error && <p>{error}</p>}
        <button disabled={isSubmitting} type="submit">
          Sign In
        </button>
      </div>
    </form>
  )
}
