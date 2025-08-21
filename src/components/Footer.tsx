import React from "react";

export const Footer = () => {
  return (
    <footer className="mt-12 w-full py-8 text-center text-sm text-neutral-400">
      <span>
        Inspired by{" "}
        <a
          href="https://nchai.net"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-blue-300 hover:underline"
        >
          nchai
        </a>{" "}
        &bull; Built by{" "}
        <span className="font-semibold text-blue-300">asius</span>
      </span>
    </footer>
  );
};
