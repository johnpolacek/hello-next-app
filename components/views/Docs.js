import { Box } from "theme-ui"
import { MDXProvider } from "@mdx-js/react"
import DocsContent from "../markdown/docs.mdx"

export default (props) => (
  <MDXProvider>
    <Box id="docs">
      <DocsContent />
    </Box>
  </MDXProvider>
)
