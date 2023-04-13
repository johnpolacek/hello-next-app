import Link from "next/link";
import SignInForm from "@/components/ui/forms/SignInForm";

export default function Signup() {
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
}
