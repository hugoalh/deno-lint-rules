import type { PluginOptions } from "../setup.ts";
import extendCLI from "./cli.ts";
export default {
	tags: [
		...extendCLI.tags ?? [],
		"no-interaction"
	],
	rules: extendCLI.rules
} satisfies PluginOptions as PluginOptions;
