import withAuthUser from "../../utils/context/withAuthUser"
import withAuthUserInfo from "../../utils/context/withAuthUserInfo"
import Wrapper from "../../components/layout/Wrapper"
import appConfig from "../../app.config"
import { Box, Heading } from "theme-ui"
import ButtonLink from "../../components/ui/nav/ButtonLink"

const Page = (props) => {
  console.log("Paid Page props", props)
  return (
    <Wrapper
      url="/"
      title={appConfig.name + " | Plans"}
      description={"Choose the right " + appConfig.name + " plan for you"}
      bg="primary"
    >
      <Box
        sx={{
          textAlign: "center",
          width: "100%",
          color: "white",
          pt: 4,
          pb: 5,
        }}
      >
        <Heading variant="headline">All Set!</Heading>
        <Heading variant="subhead">Your account is ready to go.</Heading>
        <Box sx={{ pb: 5 }}>
          <Box sx={{ display: "inline-block", mx: 3 }}>
            <ButtonLink fontSize={4} bg="red" href="/">
              Go to {appConfig.name}
            </ButtonLink>
          </Box>
          <Box sx={{ display: "inline-block", mx: 3 }}>
            <ButtonLink fontSize={4} bg="white" href="/account">
              View Account Page
            </ButtonLink>
          </Box>
        </Box>
      </Box>
    </Wrapper>
  )
}

export default withAuthUser(withAuthUserInfo(Page))
