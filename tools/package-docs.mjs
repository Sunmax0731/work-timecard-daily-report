import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const repo = "work-timecard-daily-report";
fs.mkdirSync("dist", { recursive: true });
const zipPath = path.join("dist", repo + "-docs.zip");
if (fs.existsSync(zipPath)) fs.rmSync(zipPath);
const command = [
  "$ErrorActionPreference = 'Stop'",
  "$paths = @('README.md','AGENTS.md','SKILL.md','docs','samples','public')",
  "Compress-Archive -Path $paths -DestinationPath '" + zipPath.replace(/\\/g, "\\\\") + "' -Force"
].join("; ");
execFileSync("powershell", ["-NoProfile", "-Command", command], { stdio: "inherit" });
if (fs.statSync(zipPath).size < 1024) throw new Error("Docs ZIP is too small");
console.log("created " + zipPath);
