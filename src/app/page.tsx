import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex h-screen min-h-dvh items-start justify-center">
      <main className="w-full max-w-3xl px-6">
        <Hero />
      </main>
    </div>
  );
}
