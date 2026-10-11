"use client";
import { About } from "@/components/section/About";
import { AppHeader } from "@/components/section/AppHeader";
import { Education } from "@/components/section/Education";
import { Experience } from "@/components/section/Experience";
import { Footer } from "@/components/section/Footer";
import { Hero } from "@/components/section/Hero";
import { Project } from "@/components/section/Project";
import { Stack } from "@/components/section/Stack";
import { GithubContributionCard } from "@/components/GithubContributionCard";
import { motion } from "motion/react";

export default function Home() {
  return (
    <div className="relative flex h-screen min-h-dvh items-start justify-center">
      <AppHeader />
      <main className="mt-12 w-full max-w-3xl px-6">
        <Hero />
        <About />
        <GithubContributionCard />
        <Experience />
        <Stack />
        <Project />
        <Education />
        <Footer />
      </main>
    </div>
  );
}
