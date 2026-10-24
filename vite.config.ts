import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const siteUrl = (env.VITE_SITE_URL || "http://localhost:5173").replace(/\/$/, "");
  const ogImage = `${siteUrl}/og-image.jpg`;

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: "html-social-meta",
        transformIndexHtml(html) {
          return html.replaceAll("__SITE_URL__", siteUrl).replaceAll("__OG_IMAGE__", ogImage);
        },
      },
    ],
  };
});
