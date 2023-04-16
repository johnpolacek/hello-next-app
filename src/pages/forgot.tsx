import { GetServerSideProps, NextPage } from "next";
import ForgotPasswordForm from "@/components/ui/forms/ForgotPasswordForm";

const ForgotPasswordPage: NextPage = () => {
  return (
    <div className="flex -mt-24 justify-center">
      <ForgotPasswordForm />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=100000, stale-while-revalidate=1000000"
  );
  return { props: { title: "Forgot Password" } };
};

export default ForgotPasswordPage;
