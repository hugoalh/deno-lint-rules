import { configurator } from "./configurator.ts";
export default configurator({
	"no-import-protocol-node": true,
	"no-import-protocol-npm": true
}) satisfies Deno.lint.Plugin as Deno.lint.Plugin;
