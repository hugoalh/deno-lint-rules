import { setup } from "../setup.ts";
export default setup({
	tags: [
		"curly",
		"no-depend-type-raw",
		"no-typescript-inject-feature",
		"recommended"
	],
	rules: {
		"max-complexity": true,
		"max-file-size": true,
		"no-character-ambiguous": true,
		"no-character-invisible": true,
		"no-decorator": true,
		"no-iife": true,
		"no-import-dynamic": true,
		"no-sequence-assignment": true,
		"sort-depends" : true,
		"symbol-description": true
	}
}) satisfies Deno.lint.Plugin as Deno.lint.Plugin;
