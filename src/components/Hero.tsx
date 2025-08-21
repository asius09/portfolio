"use client";
import { cn } from "@/lib/utils";
import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconBrandXFilled,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      <AnimateName />
      <div id="personal-detials" className="w-full">
        <div className="flex h-full w-full flex-row gap-6 py-4">
          <div className="h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-full">
            <Image
              src="/profile.png"
              alt="profile-picture"
              width={64}
              height={64}
            />
          </div>
          <div className="w-full" id="name-and-role">
            <h1 className="text-3xl font-bold">Bobby Tiwari</h1>
            <span
              className={cn("w-full", "text-base font-medium text-white/60")}
            >
              Frontend Developer
            </span>
          </div>
          <div id="social-links" className="flex items-center gap-2">
            <Link
              href="https://github.com/asius09"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition hover:opacity-70"
              aria-label="GitHub"
            >
              <IconBrandGithubFilled className="size-5 text-black" />
            </Link>
            <Link
              href="https://linkedin.com/bobby09"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition hover:opacity-70"
              aria-label="LinkedIn"
            >
              <IconBrandLinkedinFilled className="size-5 text-blue-400" />
            </Link>
            <Link
              href="https://x.com/_asius"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white transition hover:opacity-70"
              aria-label="Twitter"
            >
              <IconBrandXFilled className="size-5 text-black/70" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

function AnimateName() {
  return (
    <div className="flex h-52 w-full items-center justify-center">
      <h1 className="cursor-pointer p-1 text-8xl font-bold tracking-tighter text-white uppercase">
        Bobby Tiwari
      </h1>
    </div>
  );
}
