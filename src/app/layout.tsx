import type { Metadata } from "next";
import {
  Zain,
  Inter,
  Schibsted_Grotesk,
  Geist,
  Caveat,
  Outfit,
} from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";

export const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: false,
});

export const zain = Zain({
  variable: "--font-asius",
  subsets: ["latin"],
  weight: ["200", "300", "400", "700", "800", "900"],
  display: "swap",
  preload: true,
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Bobby - Full Stack Developer",
    template: "%s | Bobby",
  },
  metadataBase: new URL("https://asius.in"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://asius.in",
    siteName: "Bobby",
    title: "Bobby - Full Stack Developer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bobby - Full Stack Developer",
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
    icon: "/favicon.svg",
    apple: "/favicon.svg",
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
      data-font="zain"
      className={`${geist.variable} ${inter.variable} ${schibsted.variable} ${caveat.variable} ${zain.variable} ${outfit.variable} bg-background font-app text-foreground antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                let font = localStorage.getItem('app-font');
                if (!font) {
                  font = 'zain';
                  localStorage.setItem('app-font', font);
                }
                document.documentElement.setAttribute('data-font', font);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans">
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
            }),
          }}
        />
      </body>
    </html>
  );
}
