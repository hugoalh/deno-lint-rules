export interface DenoLintRuleDataPre<T = undefined> {
	conflicts?: readonly string[];
	context: (options?: T) => Deno.lint.Rule;
	identifier: string;
	recommended?: boolean;
}
export function constructDenoLintPlugin(rules: Record<string, Deno.lint.Rule>): Deno.lint.Plugin {
	if (Object.entries(rules).length === 0) {
		throw new TypeError(`Parameter \`rules\` is not defined!`);
	}
	return {
		name: "hugoalh",
		rules
	};
}
