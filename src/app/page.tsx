"use client";
import { About } from "@/components/section/About";
import { AppHeader } from "@/components/section/AppHeader";
import { Education } from "@/components/section/Education";
import { Experience } from "@/components/section/Experience";
import { Footer } from "@/components/section/Footer";
import { Hero } from "@/components/section/Hero";
import { Project } from "@/components/section/Project";
import { Stack } from "@/components/section/Stack";
import { WorkingIdea } from "@/components/WorkingIdea";
import { motion } from "motion/react";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.5,
      delayChildren: 0.5,
    },
  },
};

export default function Home() {
  return (
    <div className="relative flex h-screen min-h-dvh items-start justify-center">
      <AppHeader />
      <motion.main
        className="mt-12 w-full max-w-3xl px-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <Hero />
        <About />
        <Experience />
        <Stack />
        <Project />
        <Education />
        <WorkingIdea />
        <Footer />
      </motion.main>
    </div>
  );
}
