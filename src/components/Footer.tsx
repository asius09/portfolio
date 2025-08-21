import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="mt-12 w-full py-8 text-center text-sm text-neutral-400">
      <span>
        Inspired by{" "}
        <Link
          href="https://x.com/iamncdai"
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-white underline"
        >
          nchai
        </Link>{" "}
        &bull; Built by{" "}
        <Link
          className="font-bold text-white underline"
          href="https://x.com/_asius"
          target="_blank"
          rel="noopener noreferrer"
        >
          asius
        </Link>
      </span>
    </footer>
  );
};
