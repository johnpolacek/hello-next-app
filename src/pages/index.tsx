import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center py-16 gap-8">
      {user?.uid ? (
        <>
          <h2 className="text-4xl font-bold">Welcome back!</h2>
        </>
      ) : (
        <>
          <h2 className="text-4xl font-bold">Welcome!</h2>
          <Link
            className="bg-indigo-600 text-lg text-white rounded-lg px-8 py-3"
            href="/signup"
          >
            Sign Up
          </Link>
        </>
      )}
    </div>
  );
}
