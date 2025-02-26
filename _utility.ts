export interface DenoLintRuleMetadata {
	identifier: string;
}
export interface DenoLintRuleDataPre<T = undefined> extends DenoLintRuleMetadata {
	context: (options?: T) => Deno.lint.Rule;
	recommended?: boolean;
}
export interface DenoLintRuleData extends DenoLintRuleMetadata {
	context: Deno.lint.Rule;
}
export function constructDenoLintPlugin(rules: readonly DenoLintRuleData[]): Deno.lint.Plugin {
	if (rules.length === 0) {
		throw new TypeError(`Parameter \`rules\` is not defined!`);
	}
	return {
		name: "hugoalh",
		rules: Object.fromEntries(rules.map(({
			context,
			identifier
		}: DenoLintRuleData): readonly [identifier: string, context: Deno.lint.Rule] => {
			return [identifier, context];
		}))
	};
}
