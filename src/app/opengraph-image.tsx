import { ImageResponse } from "next/og";
import fs from "node:fs";
import path from "node:path";

function loadFont(name: string) {
  return fs.readFileSync(path.join(process.cwd(), "src/app/og-fonts", name));
}

export default async function Image() {
  const zain = loadFont("zain-800.ttf");
  const mono = loadFont("ibm-plex-mono-400.ttf");
  const monoMedium = loadFont("ibm-plex-mono-500.ttf");

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#09090B",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)," +
              "linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 180,
            right: 200,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 800,
              color: "#FAFAFA",
              lineHeight: 1,
              letterSpacing: "-4px",
              fontFamily: "Zain",
            }}
          >
            asius
          </div>
          <div
            style={{
              fontSize: 22,
              fontFamily: "IBM Plex Mono",
              fontWeight: 500,
              color: "#A1A1AA",
              letterSpacing: "2px",
              textTransform: "uppercase",
              marginTop: 16,
            }}
          >
            Bobby Tiwari · Full Stack Developer
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            display: "flex",
            gap: 24,
            fontFamily: "IBM Plex Mono",
            fontSize: 16,
            color: "#52525B",
          }}
        >
          <span>asius.in</span>
          <span style={{ color: "#27272A" }}>·</span>
          <span>github/asius09</span>
          <span style={{ color: "#27272A" }}>·</span>
          <span>x/_asius</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Zain", data: zain, style: "normal", weight: 800 },
        { name: "IBM Plex Mono", data: mono, style: "normal", weight: 400 },
        {
          name: "IBM Plex Mono",
          data: monoMedium,
          style: "normal",
          weight: 500,
        },
      ],
    },
  );
}
