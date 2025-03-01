import type { DenoLintRuleDataPre } from "../_utility.ts";
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			RegExpLiteral(node: Deno.lint.RegExpLiteral): void {
				const flags: readonly string[] = node.regex.flags.split("");
				if (!flags.includes("u") && !flags.includes("v")) {
					const regexpExpect: string = `/${node.regex.pattern}/${node.regex.flags}u`;
					context.report({
						range: node.range,
						message: `Prefer the regular expression is contain Unicode flag (\`u\` or \`v\`).`,
						hint: `Do you mean \`${regexpExpect}\`?`,
						fix(fixer: Deno.lint.Fixer): Deno.lint.FixData {
							return fixer.replaceText(node, regexpExpect);
						}
					});
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "prefer-regexp-flag-unicode",
	context(): Deno.lint.Rule {
		return ruleContextStatic;
	}
};
