import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import SignUpForm from "@/components/ui/forms/SignUpForm";

const SignupPage: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <SignUpForm />
      <p className="pt-16">
        Already have an account?{" "}
        <Link className="text-indigo-400" href="/signin">
          Sign In
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
  return { props: { title: "Sign Up" } };
};

export default SignupPage;
