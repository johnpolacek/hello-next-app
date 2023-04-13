import Link from "next/link";
import SignUpForm from "@/components/ui/forms/SignUpForm";

export default function Signup() {
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
}
