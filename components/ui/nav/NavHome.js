import { Text } from "theme-ui"
import NavLink from "./NavLink"
import appConfig from "../../../app.config"

const NavHome = (props) => (
  <NavLink href="/">
    <Text
      as="h1"
      sx={{
        color: "white",
        fontWeight: "inherit",
        m: 0,
        fontSize: "inherit",
      }}
    >
      <Text
        as="span"
        sx={{
          pr: "12px",
          position: "relative",
          top: "6px",
          color: "primary",
        }}
      >
        <img
          width="24"
          height="24"
          src="/logo-app.svg"
          alt={appConfig.name + " Logo"}
        />
      </Text>
      <span>{appConfig.name}</span>
    </Text>
  </NavLink>
)

export default NavHome
