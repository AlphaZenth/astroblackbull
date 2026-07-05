import { createFileRoute } from "@tanstack/react-router";
import { AstroSite } from "@/components/site/AstroSite";
import bannerAsset from "@/assets/astrobanner.jpeg.asset.json";

export const Route = createFileRoute("/")({
  component: AstroSite,
  head: () => ({
    meta: [
      { title: "ASTRO BLACK BULL | The Bull Continues the Mission" },
      {
        name: "description",
        content:
          "The Black Bull started the run. Astro Black Bull continues the mission — a Solana memecoin on a moon mission across the galaxy.",
      },
      {
        property: "og:title",
        content: "ASTRO BLACK BULL | The Bull Continues the Mission",
      },
      {
        property: "og:description",
        content:
          "The Black Bull started the run. Astro Black Bull continues the mission.",
      },
      { property: "og:image", content: bannerAsset.url },
      { property: "og:url", content: "/" },
      { name: "twitter:image", content: bannerAsset.url },
      { name: "twitter:title", content: "ASTRO BLACK BULL" },
      {
        name: "twitter:description",
        content: "The Bull Continues the Mission.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});
