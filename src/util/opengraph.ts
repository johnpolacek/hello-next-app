import appConfig from "@/app.config";

export interface OpenGraphDataItem {
  property?: string;
  name?: string;
  content: string;
}

export const getOpengraphData = ({
  title,
  description,
  image,
}: {
  title?: string;
  description?: string;
  image?: string;
}) => {
  const openGraphData: OpenGraphDataItem[] = [
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: appConfig.name },
    { property: "og:title", content: title || appConfig.name },
    {
      property: "og:description",
      content: description || appConfig.description,
    },
    {
      property: "og:image",
      content: image || appConfig.url + "/images/screenshot.jpg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title || appConfig.name },
    {
      name: "twitter:description",
      content: description || appConfig.description,
    },
    {
      property: "twitter:image",
      content: image || appConfig.url + "/images/screenshot.jpg",
    },
  ];
  return openGraphData;
};
