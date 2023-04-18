export default function About() {
  return (
    <section className="pb-16 px-8 opacity-75">
      <h2 className="tracking-wide text-3xl pb-4">About Hello Next App</h2>
      <p>
        Hello Next App is a Next.js Starter Project to get you up and running in
        production quickly with Firebase Authentication, Cloud Firestore
        Database, Serverless Edge Functions, Playwright Testing and more.
      </p>
      <p>
        <a
          className="text-xl text-indigo-700 font-bold py-4 block"
          href="https://github.com/johnpolacek/hello-next-app"
        >
          View on Github
        </a>
      </p>
    </section>
  );
}
