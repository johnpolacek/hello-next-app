import { GetServerSideProps, NextPage } from "next";
import appConfig from "@/app.config";
import Link from "next/link";

const TermsPage: NextPage = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Terms of Use</h1>
      <p className="mb-4">
        By using the {appConfig.name} website (“Service”), you are agreeing to
        be bound by the following terms and conditions (“Terms of Use”).
      </p>
      <h2 className="text-2xl font-bold mb-2">Basic Terms</h2>
      <ol className="list-decimal pl-6 mb-4">
        <li className="mb-2">
          You must be at least 13 years old to use the Service.
        </li>
        <li className="mb-2">
          You may not post violent, discriminatory, unlawful, infringing,
          hateful, pornographic or sexually suggestive photos or other content
          via the Service.
        </li>
        <li className="mb-2">
          You are responsible for any activity that occurs through your account
          and you agree you will not sell, transfer, license or assign your
          account, followers, username, or any account rights.
        </li>
        <li className="mb-2">
          You agree that you will not solicit, collect or use the login
          credentials of other {appConfig.name} users.
        </li>
        <li className="mb-2">
          You are responsible for keeping your password secret and secure.
        </li>
        <li className="mb-2">
          You must not defame, stalk, bully, abuse, harass, threaten,
          impersonate or intimidate people or entities and you must not post
          private or confidential information via the Service, including,
          without limitation, your or any other person’s credit card
          information, social security or alternate national identity numbers,
          non-public phone numbers or non-public email addresses.
        </li>
      </ol>
      <h2 className="text-2xl font-bold mb-2">General Conditions</h2>
      <ol className="list-decimal pl-6 mb-4">
        <li className="mb-2">
          We reserve the right to modify or terminate the Service or your access
          to the Service for any reason, without notice, at any time, and
          without liability to you.
        </li>
        <li className="mb-2">
          We reserve the right to refuse access to the Service to anyone for any
          reason at any time.
        </li>
        <li className="mb-2">
          We may, but have no obligation to, remove, edit, block, and/or monitor
          Content or accounts containing Content that we determine in our sole
          discretion violates these Terms of Use.
        </li>
        <li className="mb-2">
          You are solely responsible for your interaction with other users of
          the Service, whether online or offline. You agree that{" "}
          {appConfig.name} is not responsible or liable for the conduct of any
          user.
        </li>
        <li className="mb-2">
          {appConfig.name} is not responsible for the availability, accuracy, or
          reliability of any information, content, goods, data, opinions, advice
          or statements made available on the Service.
        </li>
        <li className="mb-2">
          You agree that {appConfig.name} is not liable for any loss or damage
          incurred as a result of the use of any content posted, emailed,
          transmitted, or otherwise made available through the Service.
        </li>
        <li className="mb-2">
          You agree to indemnify and hold {appConfig.name} harmless from any
          claim or demand, including reasonable attorneys’ fees, made by any
          third party due to or arising out of your breach of these Terms of
          Use, your violation of any law, or your violation of the rights of a
          third party, including the infringement by you of any intellectual
          property or other right of any person or entity.
        </li>
      </ol>
      <h2 className="text-2xl font-bold mb-2">Intellectual Property Rights</h2>
      <ol className="list-decimal pl-6 mb-4">
        <li className="mb-2">
          You acknowledge and agree that all content and materials available on
          the Service are protected by copyrights, trademarks, service marks,
          patents, trade secrets, or other proprietary rights and laws. Except
          as expressly authorized by {appConfig.name}, you agree not to sell,
          license, rent, modify, distribute, copy, reproduce, transmit, publicly
          display, publicly perform, publish, adapt, edit, or create derivative
          works from such materials or content.
        </li>
        <li className="mb-2">
          You may not systematically retrieve data or other content from the
          Service to create or compile, directly or indirectly, a collection,
          compilation, database, or directory without written permission from
          {appConfig.name}.
        </li>
      </ol>
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
  return { props: { title: "Terms of Use" } };
};

export default TermsPage;
