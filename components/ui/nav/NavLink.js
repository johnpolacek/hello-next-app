/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { useRouter } from "next/router"

const NavLink = (props) => {
  const router = useRouter()
  const isCurrent = router.pathname === props.href && props.href !== "/"
  // If you want to apply custom styling, use isCurrent
  // (not used by default)

  const styles = {
    py: [2, 3],
    px: 3,
    fontSize: 3,
    display: "inline-block",
    textDecoration: "none",
    fontWeight: "lite",
    color: "white",
    bg: props.bg ? props.bg : "transparent",
  }
  return (
    <Link href={props.href} passHref>
      <a sx={styles}>{props.children}</a>
    </Link>
  )
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  bg: PropTypes.string,
}

export default NavLink
