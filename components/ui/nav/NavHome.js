/** @jsx jsx */
import { jsx } from "theme-ui"
import NavLink from "./NavLink"
import appConfig from "../../../app.config"

export default (props) => (
  <NavLink href="/">
    <h1
      sx={{
        color: "white",
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
        <img width="24" height="24" src="/hello.svg" />
      </span>
      <span>{appConfig.name}</span>
    </h1>
  </NavLink>
)
