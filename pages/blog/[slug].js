import withSession from "../../lib/session"
import { useRouter } from "next/router"
import MDX from "@mdx-js/runtime"
import ErrorPage from "next/error"
import appConfig from "../../app.config"
import Layout from "../../components/layout/Layout"
import { Box, Heading } from "theme-ui"

import { getPostBySlug, getAllPosts } from "../../lib/blog/api"

export default function Post({ post, morePosts, preview, user }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  const components = {
    Box: (props) => <Box {...props} />,
  }

  return (
    <Layout
      url="/"
      title={appConfig.name + " | Blog"}
      description={"Read blog posts from the team at " + appConfig.name}
      user={user}
    >
      <Box sx={{ maxWidth: "960px", mx: "auto", px: [3, 4, 5], py: 4 }}>
        <Heading as="h1">{post.title}</Heading>
        <MDX components={components}>{post.content}</MDX>
      </Box>
    </Layout>
  )
}

export const getServerSideProps = withSession(async function ({
  params,
  req,
  res,
}) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ])

  const userSession = req.session.get("user")
  const user = userSession === undefined ? null : req.session.get("user")

  return {
    props: { user, post },
  }
})

// export async function getStaticProps({ params }) {

//   return {
//     props: {
//       post: {
//         ...post,
//       },
//     },
//   }
// }

// export async function getStaticPaths() {
//   const posts = getAllPosts(["slug"])

//   return {
//     paths: posts.map((post) => {
//       return {
//         params: { ...post },
//       }
//     }),
//     fallback: false,
//   }
// }
