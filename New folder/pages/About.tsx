const About = () => {
  return (
    <main className="pt-24">
      <div className="mx-auto max-w-sm rounded-2xl bg-zinc-800/90 p-8 text-center border border-zinc-700 shadow-2xl">
        <h1 className="text-2xl font-bold text-white">About</h1>
        <p className="mt-2 text-zinc-400">Made by Saba Revazishvili</p>
        <a
          href="https://rs.school/courses/reactjs"
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-block text-sm font-medium text-zinc-300 hover:text-white underline underline-offset-4 transition-colors"
        >
          RS School React Course
        </a>
      </div>
    </main>
  );
};

export default About;
