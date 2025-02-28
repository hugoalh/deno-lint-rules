import { configureDenoLintPlugin } from "./mod.ts";
export default configureDenoLintPlugin({
	"import-npm": {
		viaProtocol: false,
		viaURL: false
	},
	"no-import-node": true
}) satisfies Deno.lint.Plugin as Deno.lint.Plugin;
