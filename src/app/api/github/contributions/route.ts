import { NextResponse } from "next/server";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const USERNAME = "asius09";

const graphqlQuery = `
  query($userName:String!) {
    user(login: $userName) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

export async function GET() {
  try {
    if (GITHUB_TOKEN) {
      try {
        const gqlRes = await fetch("https://api.github.com/graphql", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
            "User-Agent": "NextJS-Portfolio",
          },
          body: JSON.stringify({
            query: graphqlQuery,
            variables: { userName: USERNAME },
          }),
          next: { revalidate: 3600 },
        });

        if (gqlRes.ok) {
          const { data } = await gqlRes.json();
          if (data?.user?.contributionsCollection?.contributionCalendar) {
            const calendar =
              data.user.contributionsCollection.contributionCalendar;
            interface GQLDay {
              date: string;
              contributionCount: number;
            }
            interface GQLWeek {
              contributionDays: GQLDay[];
            }

            // Flatten the weeks/days into a single contributions array
            const contributions = calendar.weeks.flatMap((w: GQLWeek) =>
              w.contributionDays.map((d: GQLDay) => ({
                date: d.date,
                count: d.contributionCount,
              })),
            );
            return NextResponse.json({
              contributions,
              totalContributions: calendar.totalContributions,
              source: "graphql",
            });
          }
        }
      } catch (gqlError) {
        console.error(
          "GraphQL Fetch Failed, falling back to scraping:",
          gqlError,
        );
      }
    }

    const scrapeRes = await fetch(
      `https://github.com/users/${USERNAME}/contributions`,
      {
        next: { revalidate: 3600 },
        headers: { "User-Agent": "NextJS-Portfolio" },
      },
    );

    if (!scrapeRes.ok) throw new Error("Failed to fetch from GitHub");

    const html = await scrapeRes.text();
    const contributions: { date: string; count: number }[] = [];

    const strategies = [
      /data-count=["'](\d+)["'][^>]*?data-date=["'](\d{4}-\d{2}-\d{2})["']/gi,
      /data-date=["'](\d{4}-\d{2}-\d{2})["'][^>]*?data-count=["'](\d+)["']/gi,
      /data-level=["'](\d+)["'][^>]*?data-date=["'](\d{4}-\d{2}-\d{2})["']/gi,
      /{"date":"(\d{4}-\d{2}-\d{2})","count":(\d+)/g,
    ];

    for (const regex of strategies) {
      let match;
      while ((match = regex.exec(html)) !== null) {
        const count = parseInt(match[1].length > 4 ? match[2] : match[1], 10);
        const date = match[1].length > 4 ? match[1] : match[2];
        contributions.push({ count, date });
      }
      if (contributions.length > 0) break;
    }

    return NextResponse.json({
      contributions,
      totalContributions: contributions.reduce((acc, c) => acc + c.count, 0),
      source: "scraping",
    });
  } catch (error) {
    console.error("All GitHub Fetch Strategies Failed:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
