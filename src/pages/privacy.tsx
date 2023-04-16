import { GetServerSideProps, NextPage } from "next";
import appConfig from "@/app.config";
import Link from "next/link";

const PrivacyPage: NextPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        Your privacy is important to us. It is {appConfig.name}'s policy to
        respect your privacy regarding any information we may collect from you
        across our website,{" "}
        <a href={appConfig.url} className="text-indigo-600">
          {appConfig.url}
        </a>
        , and other sites we own and operate.
      </p>
      <p className="mb-4">
        We only ask for personal information when we truly need it to provide a
        service to you. We collect it by fair and lawful means, with your
        knowledge and consent. We also let you know why we’re collecting it and
        how it will be used.
      </p>
      <p className="mb-4">
        We only retain collected information for as long as necessary to provide
        you with your requested service. What data we store, we’ll protect
        within commercially acceptable means to prevent loss and theft, as well
        as unauthorized access, disclosure, copying, use or modification.
      </p>
      <p className="mb-4">
        We don’t share any personally identifying information publicly or with
        third-parties, except when required to by law.
      </p>
      <p className="mb-4">
        Our website may link to external sites that are not operated by us.
        Please be aware that we have no control over the content and practices
        of these sites, and cannot accept responsibility or liability for their
        respective privacy policies.
      </p>
      <p className="mb-4">
        You are free to refuse our request for your personal information, with
        the understanding that we may be unable to provide you with some of your
        desired services.
      </p>
      <p className="mb-4">
        Your continued use of our website will be regarded as acceptance of our
        practices around privacy and personal information. If you have any
        questions about how we handle user data and personal information, feel
        free to contact us.
      </p>
      <p className="mb-4">This policy is effective as of April 11, 2023.</p>
      <Link href="/" className="text-indigo-600">
        Return to the homepage
      </Link>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=100000, stale-while-revalidate=1000000"
  );
  return { props: { title: "Privacy Policy" } };
};

export default PrivacyPage;
