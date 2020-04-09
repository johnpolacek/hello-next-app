/** @jsx jsx */
import { jsx } from "theme-ui"
import Link from "next/link"
import ButtonLink from "../ui/buttons/ButtonLink"

export default (props) => (
  <div sx={{ textAlign: "center", width: "100%", pb: 6 }}>
    <h2 sx={{ fontSize: 8, fontWeight: 200, pb: 4 }}>Hello!</h2>
    {props.isSignedIn ? (
      <p>You're signed in.</p>
    ) : (
      <>
        <p sx={{ pb: 2 }}>You’re not signed in yet...</p>
        <div>
          <div sx={{ display: "inline-block", mx: 2 }}>
            <Link href="/signin">
              <ButtonLink href="/signin">Sign in to Your Account</ButtonLink>
            </Link>
          </div>
          <div sx={{ display: "inline-block", mx: 2 }}>
            <Link href="/signup">
              <ButtonLink href="/signin">Create New Account</ButtonLink>
            </Link>
          </div>
        </div>
      </>
    )}
  </div>
)
