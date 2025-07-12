import { configurePlugin } from "../mod.ts";
export default configurePlugin({
	sets: [
		"no-interaction",
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
		"no-import-npm": {
			viaProtocol: false
		},
		"no-sequence-assignment": true,
		"prefer-symbol-description": true
	}
}) satisfies Deno.lint.Plugin as Deno.lint.Plugin;
