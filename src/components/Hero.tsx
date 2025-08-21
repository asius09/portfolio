"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { socials } from "@/data/social";
import { keyPoints } from "@/data/keyPoints";

export const Hero = () => {
  return (
    <section
      className="flex flex-col items-center justify-start"
      aria-labelledby="hero-heading"
      role="region"
    >
      <AnimateName />
      <header
        className="flex h-full w-full flex-row gap-6 py-4"
        id="personal-details"
        aria-label="Personal details"
      >
        <figure
          className="h-16 w-16 shrink-0 cursor-pointer overflow-hidden rounded-full"
          aria-label="Profile picture"
        >
          <Image
            src="/profile.png"
            alt="Bobby Tiwari profile picture"
            className="object-cover"
            width={64}
            height={64}
          />
        </figure>
        <div
          className="flex w-full flex-col items-start justify-center"
          id="name-and-role"
        >
          <h2 id="hero-heading" className="text-2xl font-bold">
            Bobby Tiwari
          </h2>
          <span className={cn("w-full", "text-base font-normal text-white/60")}>
            Frontend Developer
          </span>
        </div>
        <nav
          id="social-links"
          className="flex items-center gap-2"
          aria-label="Social links"
        >
          {socials.map(({ href, ariaLabel, title, Icon, iconClass }, idx) => (
            <Link
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-800 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] duration-100 hover:scale-105`}
              aria-label={ariaLabel}
              title={title}
            >
              <Icon className={cn(iconClass, "size-5")} />
              <span className="pointer-event-none absolute -top-6 left-1/2 -translate-x-1/2 rounded-sm bg-zinc-800 px-1 text-right text-[10px] opacity-0 transition-opacity duration-75 group-hover:opacity-100 after:absolute after:top-full after:left-1/2 after:h-0 after:w-0 after:-translate-x-1/2 after:border-x-4 after:border-t-4 after:border-b-0 after:border-x-transparent after:border-t-zinc-800 after:content-['']">
                {ariaLabel}
              </span>
            </Link>
          ))}
        </nav>
      </header>

      {/* Key Points */}
      <section aria-label="Key information" className="w-full">
        <ul className="flex w-full flex-col items-start justify-center gap-1">
          {keyPoints.map((item, idx) => {
            const Icon = item.icon;
            const iconClass = item.iconClass;
            if (item.href) {
              return (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-white/80"
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-800 text-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] text-shadow-xs"
                    aria-hidden="true"
                  >
                    <Icon className={iconClass} />
                  </span>
                  <Link
                    href={item.href}
                    className="underline-offset-2 transition-colors hover:text-white hover:underline"
                    tabIndex={0}
                    aria-label={
                      item.type === "email"
                        ? `Send email to ${item.text}`
                        : item.type === "phone"
                          ? `Call ${item.text}`
                          : `Visit ${item.text}`
                    }
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                  >
                    {item.text}
                  </Link>
                </li>
              );
            } else {
              return (
                <li
                  key={idx}
                  className="flex items-center gap-2 text-sm text-white/80"
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-800 text-white shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] text-shadow-xs"
                    aria-hidden="true"
                  >
                    <Icon className={cn(iconClass, "size-5")} />
                  </span>
                  <span>{item.text}</span>
                </li>
              );
            }
          })}
        </ul>
      </section>
    </section>
  );
};

function AnimateName() {
  return (
    <header
      className="relative flex h-52 w-full items-center justify-center [mask-image:radial-gradient(circle_at_center,white_80%,transparent_100%)]"
      aria-label="Hero name"
    >
      <h1
        className="z-[5] cursor-pointer p-1 text-8xl font-bold tracking-tighter text-white uppercase"
        tabIndex={0}
      >
        Asius
      </h1>
      <div
        className="absolute inset-0 h-full w-full bg-neutral-950 [background-image:linear-gradient(to_right,#27272a_0.5px,transparent_0.5px),linear-gradient(to_bottom,#27272a_0.5px,transparent_0.5px)] bg-[size:16px_16px]"
        aria-hidden="true"
        tabIndex={-1}
      ></div>
    </header>
  );
}
