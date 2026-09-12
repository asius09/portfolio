import type { Metadata } from "next";
import { IBM_Plex_Mono, Zain } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";

export const zain = Zain({
  variable: "--font-asius",
  subsets: ["latin"],
  weight: ["200", "300", "400", "700", "800", "900"],
  display: "swap",
  preload: true,
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Bobby | Full Stack Developer",
    template: "%s | Bobby",
  },
  description:
    "Personal portfolio of Bobby. Full stack developer specializing in React, Next.js, Node.js, and modern web technologies.",
  metadataBase: new URL("https://asius.in"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asius.in",
    siteName: "Bobby",
    title: "Bobby | Full Stack Developer",
    description:
      "Full stack developer specializing in React, Next.js, Node.js, and modern web technologies.",
    images: [
      {
        url: "/logo-512.png",
        width: 512,
        height: 512,
        alt: "Bobby",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Bobby | Full Stack Developer",
    description:
      "Full stack developer specializing in React, Next.js, Node.js, and modern web technologies.",
    images: ["/logo-512.png"],
    creator: "@_asius",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/logo-192.png",
    apple: "/logo-512.png",
  },
  alternates: {
    canonical: "https://asius.in",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="font-['IBM_Plex_Mono',monospace]">
        <ThemeProvider defaultTheme="system" enableSystem>
          {children}
          <Analytics />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Bobby",
              url: "https://asius.in",
              jobTitle: "Full Stack Developer",
              email: "itsmeasius@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "New Delhi",
                addressCountry: "IN",
              },
              sameAs: [
                "https://github.com/asius09",
                "https://www.linkedin.com/in/bobby09/",
                "https://x.com/_asius",
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Bobby",
              url: "https://asius.in",
              description:
                "Full stack developer specializing in React, Next.js, Node.js, and modern web technologies.",
            }),
          }}
        />
      </body>
    </html>
  );
}
