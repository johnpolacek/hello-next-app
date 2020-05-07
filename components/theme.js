const heading = {
  color: "text",
  fontFamily: "heading",
  lineHeight: "heading",
  fontWeight: "heading",
}

const inputStyles = {
  px: 3,
  py: 2,
  mb: 3,
  border: "1px solid",
  borderColor: "gray",
  bg: "white",
  borderRadius: "4px",
}

export const base = {
  space: [0, 4, 8, 16, 32, 48, 64, 96, 128, 256, 512],
  fonts: {
    body:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
    heading: "inherit",
    monospace: "Menlo, monospace",
  },
  fontSizes: [12, 14, 16, 18, 24, 30, 36, 48, 64, 72, 96, 120],
  fontWeights: {
    lite: 200,
    body: 400,
    semibold: 600,
    heading: 700,
    bold: 700,
    heavy: 900,
  },
  lineHeights: {
    body: 1.6,
    heading: 1.125,
  },
  colors: {
    text: "#fff",
    background: "#4169e1",
    primary: "#4169e1",
    secondary: "#ee5555",
    muted: "#ddd",
    blue: "#4169e1",
    cyan: "#41b9e1",
    litegray: "#eee",
    gray: "#aeb3c0",
    green: "#0a9800",
    purple: "#6941e1",
    orange: "#fba100",
    pink: "#e141b9",
    red: "#ee5555",
    white: "#fff",
    yellow: "#FFDD22",
  },
  text: {
    caps: {
      textTransform: "uppercase",
      letterSpacing: ".2em",
    },
    error: { color: "red" },
    heading: { pb: 3, color: "white", fontSize: 5, fontWeight: "bold" },
    headline: {
      fontSize: 7,
      pb: 4,
    },
    subhead: {
      fontSize: 4,
      fontWeight: "lite",
      pb: 4,
      px: 3,
      maxWidth: "1000px",
      mx: "auto",
      lineHeight: 1.3,
    },
    cardheading: {
      pb: 4,
      px: 4,
      fontSize: 5,
      fontWeight: "semibold",
      color: "primary",
    },
    huge: {
      fontSize: 9,
      fontWeight: 900,
    },
  },
  buttons: {
    primary: {
      color: "background",
      bg: "primary",
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
    reverse: {
      color: "primary",
      bg: "white",
    },
    large: {
      fontSize: 3,
      px: 3,
      py: 2,
    },
    huge: {
      fontSize: 4,
      px: 4,
      py: 3,
    },
  },
  forms: {
    input: inputStyles,
    select: inputStyles,
    textArea: inputStyles,
    label: { display: "block" },
  },
  links: {
    reverse: {
      color: "white",
    },
    footer: {
      color: "white",
      textDecoration: "none",
      fontSize: 1,
      fontWeight: 500,
      display: "block",
      mb: 1,
      opacity: ".8",
    },
  },
  cards: {
    primary: {
      bg: "white",
      pt: 5,
      px: 5,
      pb: 6,
      borderRadius: 8,
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
      color: "black",
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
  },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "body",
    },
    h1: {
      ...heading,
      fontSize: 5,
    },
    h2: {
      ...heading,
      fontSize: 4,
    },
    h3: {
      ...heading,
      fontSize: 3,
    },
    h4: {
      ...heading,
      fontSize: 2,
    },
    h5: {
      ...heading,
      fontSize: 1,
    },
    h6: {
      ...heading,
      fontSize: 0,
    },
    p: {
      color: "text",
      fontFamily: "body",
      fontWeight: "body",
      lineHeight: "body",
      code: {
        fontFamily: "monospace",
        fontSize: "80%",
        bg: "rgba(0,0,0,.2)",
        px: 2,
        py:1,
      },
    },
    a: {
      color: "text",
    },
    
    pre: {
      fontFamily: "monospace",
      overflowX: "auto",
      background: "rgba(0,0,0,.2)",
      px: 3,
      py: 2,
      width: "max-content",
      code: {
        color: "inherit",
        background: "transparent"
      },
    },
    table: {
      width: "100%",
      borderCollapse: "separate",
      borderSpacing: 0,
    },
    th: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    td: {
      textAlign: "left",
      borderBottomStyle: "solid",
    },
    img: {
      maxWidth: "100%",
    },
  },
}

export default base
