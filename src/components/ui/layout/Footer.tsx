import Link from "next/link";

export default function Footer() {
  return (
    <footer className="sm:grid grid-cols-2 sm:px-8 md:px-16 py-16 bg-white w-full border-b">
      <div className="flex flex-col sm:flex-row gap-8">
        <p>
          Created by{" "}
          <a className="text-indigo-600" href="https://johnpolacek.com">
            John Polacek
          </a>
        </p>
        <p>
          Follow{" "}
          <a className="text-indigo-600" href="https://twitter.com/johnpolacek">
            @johnpolacek
          </a>
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-8 justify-end">
        <Link href="/privacy" className="text-indigo-600">
          Privacy Policy
        </Link>
        <Link href="/terms" className="text-indigo-600">
          Terms of Use
        </Link>
      </div>
    </footer>
  );
}
