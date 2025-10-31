import { setup } from "../mod.ts";
export default setup({
	tags: [
		"curly",
		"no-interaction",
		"recommended"
	],
	rules: {
		"max-complexity": true,
		"max-file-size": true,
		"no-character-ambiguous": true,
		"no-character-invisible": true,
		"no-decorator": true,
		"no-depend-source-npm-url": true,
		"no-depend-type-bytes": true,
		"no-depend-type-text": true,
		"no-iife": true,
		"no-import-dynamic": true,
		"no-sequence-assignment": true,
		"symbol-description": true
	}
}) satisfies Deno.lint.Plugin as Deno.lint.Plugin;
