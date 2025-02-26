import { configureDenoLintPlugin } from "./mod.ts";
export default configureDenoLintPlugin() satisfies Deno.lint.Plugin as Deno.lint.Plugin;
