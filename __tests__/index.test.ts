import esbuild from "esbuild";
import { describe, expect, it } from "vitest";
import path from "path";

import { createExternalAlias } from "../src";

describe("external-global", () => {
  it("should bundle", async () => {
    const alias = createExternalAlias({
      react: "window.React",
    });
    const result = await esbuild.build({
      entryPoints: [path.resolve(__dirname, "fixtures/react/index.tsx")],
      bundle: true,
      write: false,
      alias: alias,
    });

    expect(result.warnings).toHaveLength(0);
    expect(result.outputFiles).toHaveLength(1);
    expect(result.outputFiles[0].text).toMatchSnapshot();
  });
});
