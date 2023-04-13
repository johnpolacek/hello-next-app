import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import AccountDropdown from "./controls/AccountDropdown";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="flex items-center px-16 py-8 bg-white w-full">
      <Link href="/" className="text-3xl tracking-widest text-gray-400">
        LOGO
      </Link>
      <nav className="flex flex-1 justify-end">
        {user?.uid ? (
          <AccountDropdown displayName={user.displayName} />
        ) : (
          <Link className="py-2 px-6 border-2 rounded-lg" href="/signin">
            Sign In
          </Link>
        )}
      </nav>
    </header>
  );
}
