/** @jsx jsx */
import { jsx } from "theme-ui"
import Link from "next/link"
import appConfig from "../../app.config"
import { Box, Heading, Text } from "theme-ui"
import ButtonLink from "../ui/nav/ButtonLink"

const Blog = (props) => (
  <Box
    sx={{
      textAlign: "left",
      width: "100%",
      color: "white",
      p: 4,
      mx: "auto",
      maxWidth: "640px",
    }}
  >
    <Heading
      as="h1"
      sx={{
        fontSize: 1,
        textTransform: "uppercase",
        letterSpacing: 2,
        opacity: 0.75,
        pb: 4,
      }}
    >
      {appConfig.name} Blog
    </Heading>
    {props.posts &&
      props.posts.map((post) => (
        <Box sx={{ pb: 5 }} key={post.slug}>
          <Heading>{post.title}</Heading>
          <Text sx={{ pb: 3 }}>{post.excerpt}</Text>
          <Link href={"/blog/" + post.slug} passHref>
            <a sx={{ color: "white", fontWeight: "bold", fontStyle: "italic" }}>
              Read more...
            </a>
          </Link>
        </Box>
      ))}
  </Box>
)

export default Blog
