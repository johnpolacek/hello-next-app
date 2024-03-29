import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="h-full bg-white">
      <Head />
      <body className="min-h-full bg-[#fafafa]">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
