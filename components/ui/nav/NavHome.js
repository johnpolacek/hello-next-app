/** @jsx jsx */
import { jsx } from "theme-ui"
import NavLink from "./NavLink"

export default (props) => (
  <NavLink href="/">
    <h1
      sx={{
        color: "black",
        fontWeight: "inherit",
        m: 0,
        fontSize: "inherit",
      }}
    >
      <span
        sx={{
          pr: "12px",
          position: "relative",
          top: "6px",
          color: "primary",
        }}
      >
        <img width="27" height="27" src="/hello.svg" />
      </span>
      <span>Hello Next App</span>
    </h1>
  </NavLink>
)
