import React, { useState, createContext } from "react"

const UserContext = createContext({})

const UserProvider = ({ children }) => {
  // user is null, then either a user object or false if not logged in
  const [user, setUser] = useState(null)

  console.log("user", user)

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
