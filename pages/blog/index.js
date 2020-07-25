import React from "react"
import withSession from "../../lib/session"
import appConfig from "../../app.config"
import { getAllPosts } from "../../lib/blog/api"
import Layout from "../../components/layout/Layout"
import BlogView from "../../components/views/Blog"
// Note: It is recommended for SEO that you have a different title and description for each page

const Blog = (props) => {
  return (
    <Layout
      url="/"
      title={appConfig.name + " | Blog"}
      description={"Read blog posts from the team at " + appConfig.name}
      user={props.user}
    >
      <BlogView posts={props.posts} />
    </Layout>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const userSession = req.session.get("user")
  const user = userSession === undefined ? null : req.session.get("user")

  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "excerpt",
  ])

  return {
    props: { user, posts },
  }
})

export default Blog
