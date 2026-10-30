// Finds Tailwind classes that have a canonical v4 spelling, using Tailwind's
// own engine (the same check as the editor's "suggestCanonicalClasses"
// warning), across every file, not just the ones open in the editor.
//
//   npm run lint:tw          list classes to change
//   npm run lint:tw -- --fix rewrite them in place
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { __unstable__loadDesignSystem } from "@tailwindcss/node";

const root = process.cwd();
const fix = process.argv.includes("--fix");
const css = readFileSync(join(root, "app/globals.css"), "utf8");
const ds = await __unstable__loadDesignSystem(css, { base: join(root, "app") });

const files = [];
const walk = (dir) =>
  readdirSync(dir).forEach((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(tsx?|css)$/.test(name)) files.push(path);
  });
["app", "components", "lib"].forEach((dir) => walk(join(root, dir)));

const escape = (s) => s.replace(/[.*+?^${}()|[\]\/]/g, "\$&");
let count = 0;

for (const file of files) {
  let src = readFileSync(file, "utf8");
  const tokens = new Set(src.split(/[\s"'`{}(),;<>=]+/));
  for (const token of tokens) {
    // "!visible" in code is a negation, not an important modifier.
    if (!token || token.startsWith("!") || !ds.parseCandidate(token).length) continue;
    const [canonical] = ds.canonicalizeCandidates([token], { rem: 16 });
    if (!canonical || canonical === token) continue;
    count++;
    console.log(`${relative(root, file)}: ${token} -> ${canonical}`);
    if (fix) {
      const pattern = new RegExp(`(?<=[\s"'\`{(])${escape(token)}(?=[\s"'\`})])`, "g");
      src = src.replace(pattern, canonical);
    }
  }
  if (fix) writeFileSync(file, src);
}

console.log(
  count
    ? `${count} class${count === 1 ? "" : "es"} ${fix ? "fixed" : "to change (run with --fix)"}`
    : "All Tailwind classes are canonical.",
);
if (count && !fix) process.exitCode = 1;
