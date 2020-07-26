import Head from "next/head"
import PropTypes from "prop-types"
import appConfig from "../../app.config"

const DocHead = (props) => (
  <>
    <Head>
      <title>{props.title}</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="canonical" href={props.url} />
      <meta name="description" content={props.description} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      {appConfig.shareImage && <meta property="og:image" content={appConfig.shareImage} />}
      {appConfig.shareImageAlt && <meta property="og:image:alt" content={appConfig.shareImageAlt} />}
      <meta property="og:url" content={props.url} />
      <meta
        name="twitter:card"
        content={appConfig.shareImage ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:site" content={appConfig.twitter} />
      <meta name="twitter:creator" content={appConfig.twitter} />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      {appConfig.shareImage && <meta property="twitter:image" content={appConfig.shareImage} />}
      {appConfig.shareImageAlt && <meta property="twitter:image:alt" content={appConfig.shareImageAlt} />}
    </Head>
  </>
)

DocHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  appConfig.shareImage: PropTypes.string,
  appConfig.shareImageAlt: PropTypes.string,
  twitter: PropTypes.string,
  twitterAuthor: PropTypes.string,
}

export default DocHead
