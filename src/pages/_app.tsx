import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/ui/layout/Layout";
import Head from "next/head";
import appConfig from "@/app.config";
import { AuthContextProvider } from "@/context/AuthContext";

interface OpenGraphDataItem {
  property?: string;
  name?: string;
  content: string;
}

const defaultOpenGraphData = [
  { property: "og:type", content: "website" },
  { property: "og:site_name", content: appConfig.name },
  { property: "og:description", content: appConfig.description },
  { property: "og:title", content: appConfig.name },
  { property: "og:image", content: appConfig.image },
  { name: "twitter:card", content: "summary_large_image" },
  { name: "twitter:title", content: appConfig.name },
  { name: "twitter:description", content: appConfig.description },
  { name: "twitter:image", content: appConfig.image },
];

export default function App({ Component, pageProps }: AppProps) {
  const {
    openGraphData = defaultOpenGraphData,
    title,
    description,
  } = pageProps;
  return (
    <AuthContextProvider>
      {openGraphData.length > 0 && (
        <Head>
          <title>{title || appConfig.name}</title>
          <meta
            name="description"
            content={description || appConfig.description}
          />
          {openGraphData.map((og: OpenGraphDataItem) => (
            <meta key={og.property || og.name} {...og} />
          ))}
        </Head>
      )}
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}
