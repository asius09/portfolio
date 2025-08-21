import { About } from "@/components/About";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Project } from "@/components/Project";
import { Stack } from "@/components/Stack";
import { WorkingIdea } from "@/components/WorkingIdea";

export default function Home() {
  return (
    <div className="flex h-screen min-h-dvh items-start justify-center">
      <main className="w-full max-w-3xl px-6">
        <Hero />
        <About />
        <Stack />
        <Project />
        <Education />
        <WorkingIdea />
        <Footer />
      </main>
    </div>
  );
}
