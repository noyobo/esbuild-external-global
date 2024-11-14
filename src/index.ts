import type { BuildOptions } from "esbuild";
import path from "node:path";
import fs from "fs-extra";

export const createExternalAlias = (alias: Record<string, string>) => {
  const aliasMap: BuildOptions["alias"] = {};

  for (const key in alias) {
    const file = path.join(__dirname, "alias", `${alias[key]}.js`);
    fs.ensureFileSync(file);
    fs.writeFileSync(file, `module.exports = ${alias[key]}`);
    aliasMap[key] = file;
  }

  return aliasMap
};

export const externalGlobal = (
  alias: BuildOptions["alias"],
): ((options: BuildOptions) => BuildOptions) => {
  const aliasMap = createExternalAlias(alias);

  return (options: BuildOptions) => {
    const alias = options.alias || {};
    for (const key in aliasMap) {
      if (alias[key]) {
        throw new Error(`alias ${key} already exists`);
      }
      alias[key] = aliasMap[key];
    }
    return {
      ...options,
      alias,
    };
  };
};
