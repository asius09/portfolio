import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import fs from "node:fs";
import path from "node:path";

export const runtime = "nodejs";

function loadFont(name: string) {
  return fs.readFileSync(path.join(process.cwd(), "src/app/og/fonts", name));
}

function hsl(h: number, s: number, l: number) {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const hue = Number(searchParams.get("hue")) || 280;

  const zainBold = loadFont("zain-800.ttf");
  const monoRegular = loadFont("ibm-plex-mono-400.ttf");
  const monoMedium = loadFont("ibm-plex-mono-500.ttf");

  const glow1 = hsl(hue, 80, 55);
  const glow2 = hsl((hue + 110) % 360, 75, 50);
  const glow3 = hsl((hue + 220) % 360, 70, 45);

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: "#09090B",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Zain",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
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
            top: "-180px",
            left: "-120px",
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${glow1}55 0%, transparent 70%)`,
            filter: "blur(80px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-220px",
            right: "-100px",
            width: 800,
            height: 800,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${glow2}45 0%, transparent 70%)`,
            filter: "blur(90px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "100px",
            right: "200px",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${glow3}35 0%, transparent 65%)`,
            filter: "blur(70px)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: "#FAFAFA",
              lineHeight: 1,
              letterSpacing: "-2px",
              fontFamily: "Zain",
            }}
          >
            Bobby Tiwari
          </div>
          <div
            style={{
              fontSize: 28,
              fontFamily: "IBM Plex Mono",
              color: "#A1A1AA",
              letterSpacing: "4px",
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            Full Stack Developer
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 32,
              fontFamily: "IBM Plex Mono",
              fontSize: 18,
              color: "#71717A",
            }}
          >
            <span>github/asius09</span>
            <span style={{ color: "#3F3F46" }}>·</span>
            <span>linkedin/bobby09</span>
            <span style={{ color: "#3F3F46" }}>·</span>
            <span>x/_asius</span>
          </div>
          <div
            style={{
              fontFamily: "IBM Plex Mono",
              fontSize: 20,
              fontWeight: 500,
              color: "#FAFAFA",
              letterSpacing: "1px",
            }}
          >
            asius.in
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Zain", data: zainBold, style: "normal", weight: 800 },
        {
          name: "IBM Plex Mono",
          data: monoRegular,
          style: "normal",
          weight: 400,
        },
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
