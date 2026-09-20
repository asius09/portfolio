import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

function loadFont(name: string) {
  return fs.readFileSync(path.join(process.cwd(), "src/app/og/fonts", name));
}

export async function GET(req: NextRequest) {
  const interBold = loadFont("Inter-Bold.woff");
  const monoMedium = loadFont("ibm-plex-mono-500.ttf");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#080808", // Very dark brutalist gray/black
          fontFamily: "Inter",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient Gradient Glows */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "80%",
            height: "80%",
            background: "radial-gradient(circle, rgba(56, 189, 248, 0.07) 0%, rgba(0,0,0,0) 60%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            right: "-10%",
            width: "80%",
            height: "80%",
            background: "radial-gradient(circle, rgba(129, 140, 248, 0.07) 0%, rgba(0,0,0,0) 60%)",
          }}
        />

        {/* Faint Architectural Grid/Lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Top Left Branding Block */}
        <div style={{ position: "absolute", top: 40, left: 40, display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ color: "#555555", fontFamily: "IBM Plex Mono", fontSize: 16, fontWeight: 500, letterSpacing: "1px" }}>Bobby (asius)</span>
            <span style={{ color: "#333333", fontFamily: "IBM Plex Mono", fontSize: 14 }}>Portfolio 2026</span>
          </div>
        </div>

        {/* Central Text Block */}
        <div style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "40px" }}>

          {/* High Contrast Text (Dark vs Bright) */}
          <div style={{ display: "flex", flexDirection: "column", marginTop: 24, marginBottom: 24, gap: 8 }}>
            <h1
              style={{
                fontSize: 84,
                fontWeight: 800,
                color: "#4a4a4a", // slightly lighter dark grey for better readability
                letterSpacing: "-2px",
                margin: 0,
                lineHeight: 1,
              }}
            >
              Software Engineer building
            </h1>
            <h1
              style={{
                fontSize: 84,
                fontWeight: 800,
                color: "#ffffff", // Bright stark white
                letterSpacing: "-2px",
                margin: 0,
                lineHeight: 1,
                textShadow: "0 0 40px rgba(255,255,255,0.3)",
              }}
            >
              web, mobile & AI products.
            </h1>
          </div>
        </div>

        {/* Small Bottom Left Technical Text */}
        <div style={{ position: "absolute", bottom: 40, left: 40, display: "flex", flexDirection: "column", maxWidth: 400, gap: 8 }}>
          <span style={{ color: "#444444", fontFamily: "IBM Plex Mono", fontSize: 16, lineHeight: 1.4 }}>
            System architectures, interactive frontends, and AI integrations engineered for scale and impact.
          </span>
          <span style={{ color: "#555555", fontFamily: "IBM Plex Mono", fontSize: 16, marginTop: 16 }}>
            // asius.in
          </span>
        </div>

        {/* Right side simple CTA */}
        <div style={{ position: "absolute", bottom: 40, right: 40, display: "flex", alignItems: "center" }}>
          <span style={{ color: "#ffffff", fontFamily: "IBM Plex Mono", fontSize: 20, fontWeight: 500, letterSpacing: "1px" }}>
            [ View Portfolio ]
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: interBold, style: "normal", weight: 800 },
        { name: "IBM Plex Mono", data: monoMedium, style: "normal", weight: 500 },
      ],
    }
  );
}
