import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { spawn } from "node:child_process";
import { keccak256 } from "viem";

const cwd = process.cwd();
const asconfigPath = join(cwd, "asconfig.json");

/**
 * @typedef {{ outFile?: string }} AsconfigTarget
 * @typedef {{ targets?: Record<string, AsconfigTarget> }} Asconfig
 * @typedef {{ name: string, hash: string }} LensBuildMetadata
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

/**
 * Mirrors Shinzohub's metadata lens hash: first 16 bytes of Keccak-256 over
 * the decoded WASM bytes.
 *
 * @param {Uint8Array} wasm
 * @returns {string}
 */
const buildShortLensHash = (wasm) => keccak256(wasm).slice(0, 34);

/**
 * @param {string} targetName
 * @param {string} outFile
 * @returns {void}
 */
const writeLensMetadata = (targetName, outFile) => {
  const wasm = readFileSync(join(cwd, outFile));
  /** @type {LensBuildMetadata} */
  const metadata = {
    name: targetName,
    hash: buildShortLensHash(wasm),
  };
  const metadataPath = join(cwd, dirname(outFile), "metadata.json");

  writeFileSync(metadataPath, `${JSON.stringify(metadata, null, 2)}\n`);
};

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
  writeLensMetadata(targetName, target.outFile);
}
