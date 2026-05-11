import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";

const cwd = process.cwd();
const asconfigPath = join(cwd, "asconfig.json");

/**
 * @typedef {{ outFile?: string }} AsconfigTarget
 * @typedef {{ targets?: Record<string, AsconfigTarget> }} Asconfig
 */

/**
 * @param {string} command
 * @param {string[]} args
 * @returns {Promise<void>}
 */
const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
      env: process.env,
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(" ")} exited with code ${code ?? -1}`));
    });
  });

/** @type {Asconfig} */
const asconfig = JSON.parse(readFileSync(asconfigPath, "utf8"));
const targets = asconfig.targets ?? {};
const requestedTargets = process.argv.slice(2);
const targetNames =
  requestedTargets.length > 0 ? requestedTargets : Object.keys(targets);

if (targetNames.length === 0) {
  throw new Error("No AssemblyScript targets were found in asconfig.json.");
}

for (const targetName of targetNames) {
  const target = targets[targetName];
  if (target == null) {
    throw new Error(`Unknown AssemblyScript target "${targetName}".`);
  }
  if (target.outFile == null || target.outFile.length === 0) {
    throw new Error(`Target "${targetName}" is missing an outFile in asconfig.json.`);
  }

  const entryPath = join(dirname(target.outFile), "index.ts");
  await run("asc", [entryPath, "--target", targetName]);
}
