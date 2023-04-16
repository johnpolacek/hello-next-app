import appConfig from "@/app.config";

export default function About() {
  return (
    <section className="pb-16 px-8 opacity-75">
      <h2 className="tracking-wide text-3xl pb-4">About {appConfig.name}</h2>
      <p>{appConfig.description}</p>
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
