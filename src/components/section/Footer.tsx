import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className="text-mute-foreground mt-12 w-full py-8 text-center text-sm">
      <span>
        Inspired by{" "}
        <Link
          href="https://x.com/iamncdai"
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground font-bold underline"
        >
          nchai
        </Link>{" "}
        &bull; Built by{" "}
        <Link
          className="text-foreground font-bold underline"
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
