"use client";
import { About } from "@/components/About";
import { AppHeader } from "@/components/AppHeader";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { Project } from "@/components/Project";
import { Stack } from "@/components/Stack";
import { WorkingIdea } from "@/components/WorkingIdea";
import { motion } from "motion/react";

// Container only controls sequencing (no section animation)
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
        <Stack />
        <Project />
        <Education />
        <WorkingIdea />
        <Footer />
      </motion.main>
    </div>
  );
}
