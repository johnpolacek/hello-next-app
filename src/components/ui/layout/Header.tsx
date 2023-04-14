import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import AccountDropdown from "../controls/AccountDropdown";
import appConfig from "@/app.config";
import Image from "next/image";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="flex items-center px-16 py-8 bg-white w-full">
      <Link href="/" className="text-xl tracking-wide text-gray-800">
        <Image
          className="inline -mt-1"
          width={32}
          height={32}
          alt=""
          src="/logo-app.svg"
        />
        <span className="pl-4">{appConfig.name}</span>
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
