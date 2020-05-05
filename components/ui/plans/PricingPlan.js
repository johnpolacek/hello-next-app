import { Flex, Box, Card, Heading, Text, Button } from "theme-ui"
import appConfig from "../../../app.config"
import ButtonLink from "../nav/ButtonLink"
import { stringToSlug } from "../../../lib/util"

export default (props) => (
  <Card sx={{ width: "340px", m: 3, p: 4 }}>
    {props.isCurrent && (
      <Box sx={{ mt: -5, mb: 3 }}>
        <Text
          sx={{
            py: 1,
            px: 3,
            bg: "secondary",
            color: "white",
            display: "inline-block",
            fontWeight: "bold",
            borderRadius: "4px",
          }}
        >
          Your current plan
        </Text>
      </Box>
    )}
    <Heading variant="cardheading">{props.name}</Heading>
    <Box
      sx={{
        position: "relative",
        left: "-8px",
        mt: -4,
        mb: -2,
        lineHeight: 1.1,
      }}
    >
      <Text as="sup" sx={{ fontWeight: 700, fontSize: 6 }}>
        $
      </Text>
      <Text as="span" variant="huge">
        {props.price}
      </Text>
    </Box>
    {props.isMonthly && (
      <Text sx={{ fontSize: 2, opacity: 0.75 }}>per month</Text>
    )}
    <Box sx={{ py: 4 }}>
      {props.isCurrent ? (
        <Box
          sx={{
            fontSize: 4,
            color: "white",
            bg: "secondary",
            display: "inline-block",
            py: 3,
            px: 4,
          }}
        >
          Selected
        </Box>
      ) : (
        <ButtonLink fontSize={4} href={"./plans/" + stringToSlug(props.name)}>
          Select Plan
        </ButtonLink>
      )}
    </Box>
    <Box as="ul" sx={{ p: 0, textAlign: "left" }}>
      {props.includes.map((includes, index) => (
        <Text
          key={"includes" + index}
          as="li"
          sx={{
            fontSize: 3,
            fontWeight: 500,
            listStyle: "none",
            py: 3,
            pl: 3,
            pr: 2,
            borderTop: index === 0 ? "none" : "solid 1px",
            borderColor: "muted",
          }}
        >
          <Text
            as="span"
            sx={{
              color: "secondary",
              pr: 1,
              fontWeight: 900,
              fontSize: 4,
              display: "inline-block",
              transform: "rotate(-6deg)",
            }}
          >
            ✓
          </Text>
          <Text as="span"> {includes}</Text>
        </Text>
      ))}
    </Box>
  </Card>
)
