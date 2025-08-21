import { About } from "@/components/About";
import { AppHeader } from "@/components/AppHeader";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Project } from "@/components/Project";
import { Stack } from "@/components/Stack";
import { WorkingIdea } from "@/components/WorkingIdea";

export default function Home() {
  return (
    <div className="flex h-screen min-h-dvh items-start justify-center relative">
      <AppHeader />
      <main className="w-full max-w-3xl px-6 mt-12">
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
