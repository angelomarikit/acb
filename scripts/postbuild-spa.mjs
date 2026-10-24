import { copyFileSync, mkdirSync } from "fs";
import { join } from "path";

const dist = join(process.cwd(), "dist");
const adminDir = join(dist, "admin");

mkdirSync(adminDir, { recursive: true });
copyFileSync(join(dist, "index.html"), join(adminDir, "index.html"));

console.log("Created dist/admin/index.html for SPA /admin route");
