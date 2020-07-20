/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import PropTypes from "prop-types"
import Link from "next/link"

const A = React.forwardRef(({ onClick, href, styles, children }, ref) => {
  return (
    <a href={href} sx={styles} ref={ref}>
      {children}
    </a>
  )
})

const ButtonLink = (props) => {
  
  const styles = {
    textDecoration: "none",
    fontSize: props.fontSize || 3,
    px: props.fontSize || 3,
    py: props.fontSize ? props.fontSize - 1 : 2,
    bg: props.bg || "primary",
    color: props.bg === "white" ? "primary" : "#fff",
    boxShadow: "none",
    borderRadius: "4px",
    border: "none",
    cursor: "pointer",
    display: "inline-block",
  }
  return props.href.includes("http") ? (
    <A href={props.href} styles={styles}>{props.children}</A>
  ) : (
    <Link href={props.href} passHref>
      <A styles={styles}>{props.children}</A>
    </Link>
  )
}

ButtonLink.propTypes = {
  href: PropTypes.string.isRequired,
  bg: PropTypes.string,
  fontSize: PropTypes.number,
}

export default ButtonLink
