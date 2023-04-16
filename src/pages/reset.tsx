import { GetServerSideProps, NextPage } from "next";
import ResetPasswordForm from "@/components/ui/forms/ResetPasswordForm";

const ResetPasswordPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <ResetPasswordForm />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=100000, stale-while-revalidate=1000000"
  );
  return { props: { title: "Reset Password" } };
};

export default ResetPasswordPage;
