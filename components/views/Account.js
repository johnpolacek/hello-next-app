import { Box, Heading, Text, Link } from "theme-ui"
import NextLink from "next/link"
import ButtonLink from "../ui/nav/ButtonLink"

export default (props) => {
  return (
    <Box sx={{ textAlign: "center", width: "100%", color: "white", pb: 5 }}>
      <Heading variant="headline">Your Account</Heading>
      {props.plan ? (
        <>
          <NextLink href="./cancel" passHref>
            <Link variant="reverse">Cancel Account</Link>
          </NextLink>
          <Box
            as="pre"
            sx={{
              my: 4,
              bg: "black",
              textAlign: "left",
              opacity: 0.75,
              width: "100%",
              overflow: "scroll",
            }}
          >
            <code>{JSON.stringify(props, null, 2)}</code>
          </Box>
        </>
      ) : (
        <Box sx={{ pb: 6, mb: 6 }}>
          <Heading variant="subhead">Your account has been cancelled.</Heading>
          <ButtonLink bg="secondary" fontSize={4} href="/plans">
            Activate New Plan
          </ButtonLink>
        </Box>
      )}
    </Box>
  )
}
