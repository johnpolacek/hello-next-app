import { useRouter } from "next/router"
import MDX from "@mdx-js/runtime"
import ErrorPage from "next/error"
import { getPostBySlug, getAllPosts } from "../../lib/blog/api"

export default function Post({ post, morePosts, preview }) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      <div>{post.title}</div>
      <MDX>
        {post.content}
      </MDX>
    </>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ])
  return {
    props: {
      post: {
        ...post,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"])

  return {
    paths: posts.map((post) => {
      return {
        params: { ...post },
      }
    }),
    fallback: false,
  }
}
