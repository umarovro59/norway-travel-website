import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Around the World — Norway Mountains",
    short_name: "Around the World",
    description: "Slow, small-group journeys through Norway’s mountains, fjords and Arctic north.",
    start_url: "/",
    display: "standalone",
    background_color: "#e9e1d5",
    theme_color: "#e9e1d5",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
