import type { Route } from "./+types/home";
import Navbar from "../components/navbar";
import ResumeCarousel from "../components/ResumeCarousel";
import Footer from "../components/footer";

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
    <main className="bg-[url('/images/bgmain.jpg')] bg-cover bg-center bg-no-repeat min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <section className="flex flex-col items-center gap-6 sm:gap-8 pt-8 sm:pt-12 px-4 sm:px-6 pb-5">
          <div className="flex flex-col items-center gap-4 sm:gap-8 max-w-4xl text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Stand Out in Competitive Markets with Smart Resume Analysis
            </h1>
            <h2 className="text-base sm:text-lg md:text-xl max-w-3xl text-gray-700">
              Receive clear scores, tailored suggestions, and actionable advice
              on structure, skills, and clarity.
            </h2>
          </div>
        </section>
        <ResumeCarousel />
      </div>
      <Footer />
    </main>
  );
}
