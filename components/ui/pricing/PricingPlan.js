import { Flex, Box, Card, Heading, Text, Button } from "theme-ui"
import appConfig from "../../../app.config"

export default (props) => (
  <Card sx={{ width: "340px", m: 3, p: 4 }}>
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
    <Box sx={{ py: 3 }}>
      <Button
        variant="huge"
        onClick={() => {
          props.onSelect(props.index)
        }}
      >
        Sign Up
      </Button>
    </Box>
    <Box as="ul" sx={{ p: 0, textAlign: "left" }}>
      {props.includes.map((includes, index) => (
        <Text
          key={"includes"+index}
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
