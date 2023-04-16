import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import SignInForm from "@/components/ui/forms/SignInForm";

const SigninPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <SignInForm />
      <p className="pt-12">
        Forgot your password?{" "}
        <Link className="text-indigo-600" href="/forgot">
          Reset password
        </Link>
      </p>
      <p className="pt-4">
        Don’t have an account?{" "}
        <Link className="text-indigo-600" href="/signup">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=100000, stale-while-revalidate=1000000"
  );
  return { props: { title: "Sign In" } };
};

export default SigninPage;
