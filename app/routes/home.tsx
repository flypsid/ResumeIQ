import type { Route } from "./+types/home";
import Navbar from "../components/navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeIQ - Smart Resume Analysis" },
    {
      name: "description",
      content:
        "Smart platform helping job seekers excel with resume scoring, personalized feedback, and tips on structure, skills, and clarity.",
    },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bgmain.jpg')] bg-cover bg-center bg-no-repeat">
      <Navbar />
      <section className="flex flex-col items-center gap-8 pt-12 max-sm:mx-2 mx-15 pb-5">
        <div className="flex flex-col items-center gap-8 max-w-4xl text-center max-sm:gap-4">
          <h1 className="text-5xl">
            Stand Out in Competitive Markets with Smart Resume Analysis
          </h1>
          <h2 className="text-xl max-w-3xl">
            Receive clear scores, tailored suggestions, and actionable advice on
            structure, skills, and clarity.
          </h2>
        </div>
      </section>
    </main>
  );
}
