import { Box, Text, Link } from "theme-ui"

export default (props) => (
  <Box
    as="header"
    sx={{
      p: 4,
      color: "white",
      textAlign: "center",
      fontSize: 3,
      bg: "primary",
    }}
  >
    <Box>
      <Text sx={{ mx: 3, display: "inline-block" }}>
        Created by{" "}
        <Link variant="reverse" href="https://johnpolacek">
          John Polacek
        </Link>
      </Text>
      <Text sx={{ mx: 3, display: "inline-block" }}>
        Open sourced on{" "}
        <Link
          variant="reverse"
          href="https://github.com/johnpolacek/project-starter"
        >
          Github
        </Link>
      </Text>
    </Box>
    <Box sx={{ fontSize: 0, pt: 3, mb: -3 }}>
      Hello Icon by{" "}
      <Link
        variant="reverse"
        href="https://www.flaticon.com/authors/vitaly-gorbachev"
      >
        Vitaly Gorbachev
      </Link>{" "}
      from{" "}
      <Link variant="reverse" href="https://www.flaticon.com/">
        flaticon.com
      </Link>
    </Box>
  </Box>
)
