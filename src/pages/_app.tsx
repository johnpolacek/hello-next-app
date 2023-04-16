import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/ui/layout/Layout";
import Head from "next/head";
import appConfig from "@/app.config";
import { AuthContextProvider } from "@/context/AuthContext";
import { getOpengraphData, OpenGraphDataItem } from "@/util/opengraph";

export default function App({ Component, pageProps }: AppProps) {
  const { title, description, image } = pageProps;
  const openGraphData = getOpengraphData({ title, description, image });
  return (
    <AuthContextProvider>
      {openGraphData.length > 0 && (
        <Head>
          <title>
            {title ? appConfig.name + " | " + title : appConfig.name}
          </title>
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
