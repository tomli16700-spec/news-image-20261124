import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

const target = join(outputDir, "entry.png");

mkdirSync(outputDir, { recursive: true });
copyFileSync(join(repoDir, "entry.png"), target);

if (!existsSync(target)) {
  throw new Error(`output missing: ${target}`);
}
const bytes = readFileSync(target);
const digest = createHash("sha256").update(bytes).digest("hex");
console.log(`wrote ${target}: ${statSync(target).size} bytes, sha256 ${digest}`);
