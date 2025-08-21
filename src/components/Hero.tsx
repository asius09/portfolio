"use client";
import { cn } from "@/lib/utils";
import {
  IconBrandGithubFilled,
  IconBrandLinkedinFilled,
  IconBrandReact,
  IconBrandXFilled,
  IconGenderMale,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-start">
      <AnimateName />
      <div
        className="flex h-full w-full flex-row gap-6 py-4"
        id="personal-detials"
      >
        <div className="h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-full">
          <Image
            src="/profile.png"
            alt="profile-picture"
            width={64}
            height={64}
          />
        </div>
        <div
          className="flex w-full flex-col items-start justify-center"
          id="name-and-role"
        >
          <h1 className="text-2xl font-bold">Bobby Tiwari</h1>
          <span className={cn("w-full", "text-base font-normal text-white/60")}>
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

      {/* Key Points */}
      <ul className="flex w-full flex-col items-start justify-center gap-1">
        {[
          {
            icon: <IconBrandReact className="size-5 text-cyan-400" />,
            text: "Frontend Developer",
          },
          {
            icon: <IconMapPin className="size-5 text-pink-400" />,
            text: "New Delhi, India",
          },
          {
            icon: <IconPhone className="size-5 text-green-400" />,
            text: "+91 93154 05304",
          },
          {
            icon: <IconMail className="size-5 text-yellow-400" />,
            text: "itsmeasius@gmail.com",
          },
          {
            icon: <IconMail className="size-5 text-yellow-400" />,
            text: "asius@asius.com",
          },
          {
            icon: <IconGenderMale className="size-5 text-blue-400" />,
            text: "He/him",
          },
        ].map((item, idx) => (
          <li
            key={idx}
            className="flex items-center gap-2 text-base text-white/80"
          >
            {item.icon}
            <span>{item.text}</span>
          </li>
        ))}
      </ul>
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
