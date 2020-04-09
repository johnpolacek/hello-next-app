/** @jsx jsx */
import { jsx } from "theme-ui"
import PropTypes from "prop-types"
import Link from "next/link"
import { useRouter } from "next/router"

const A = React.forwardRef(({ onClick, href, styles, children }, ref) => {
  return (
    <a href={href} sx={styles} ref={ref}>
      {children}
    </a>
  )
})

const NavLink = (props) => {
  const router = useRouter()
  const styles = {
    py: [2, 3],
    px: 3,
    fontSize: 4,
    fontWeight: "lite",
    display: "inline-block",
    textDecoration: "none",
    borderBottom: "1px solid",
    borderColor:
      router.pathname === props.href && props.href !== "/"
        ? "primary"
        : "white",
  }
  return (
    <Link href={props.href} passHref>
      <A styles={styles}>{props.children}</A>
    </Link>
  )
}

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
}

export default NavLink
