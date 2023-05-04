import Link from "next/link";

export default function Footer() {
  return (
    <footer className="md:grid grid-cols-2 md:px-8 md:px-16 py-16 bg-white w-full border-b">
      <div className="flex flex-col items-center md:flex-row gap-8">
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
      <div className="flex flex-col md:flex-row mt-8 md:mt-0 gap-8 items-center justify-end">
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
