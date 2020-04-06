/** @jsx jsx */
import { jsx } from "theme-ui"

export default (props) => (
  <footer
    sx={{
      p: 4,
      color: "#AAA",
      textAlign: "center",
      fontSize: 3,
    }}
  >
    <div>
      <span sx={{ mx: 3, display: "inline-block" }}>
        Created by <a href="https://johnpolacek">John Polacek</a>
      </span>
      <span sx={{ mx: 3, display: "inline-block" }}>
        Open sourced on{" "}
        <a href="https://github.com/johnpolacek/project-starter">Github</a>
      </span>
      <span sx={{ mx: 3, display: "inline-block" }}>
        Follow <a href="https://twitter.com/johnpolacek">@johnpolacek</a>
      </span>
    </div>
    <div sx={{ fontSize: 0, pt: 3, mb: -3 }}>
      Hello Icon by{" "}
      <a href="https://www.flaticon.com/authors/vitaly-gorbachev">
        Vitaly Gorbachev
      </a>{" "}
      from <a href="https://www.flaticon.com/">flaticon.com</a>
    </div>
  </footer>
)
