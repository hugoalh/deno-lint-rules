import { configureDenoLintPlugin } from "./mod.ts";
export default configureDenoLintPlugin({
	"no-alert": true,
	"no-confirm": true,
	"no-iife": true,
	"no-import-dynamic": true,
	"no-import-node": true,
	"no-import-npm": true,
	"no-prompt": true
}) satisfies Deno.lint.Plugin as Deno.lint.Plugin;
