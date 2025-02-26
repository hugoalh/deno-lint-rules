import { configureDenoLintPlugin } from "./mod.ts";
export default configureDenoLintPlugin({
	"no-import-protocol-npm": true,
	"restrict-module": {
		node: {
			fromProtocol: false
		}
	}
}) satisfies Deno.lint.Plugin as Deno.lint.Plugin;
