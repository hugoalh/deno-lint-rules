import { configureDenoLintPlugin } from "./mod.ts";
export default configureDenoLintPlugin({
	"import-npm": {
		viaProtocol: false,
		viaURL: false
	},
	"no-alert": true,
	"no-confirm": true,
	"no-import-node": true,
	"no-prompt": true
}) satisfies Deno.lint.Plugin as Deno.lint.Plugin;
