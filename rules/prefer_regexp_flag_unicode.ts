import type { DenoLintRuleDataPre } from "../_utility.ts";
const ruleContextStatic: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Literal(node: Deno.lint.Literal): void {
				if (node.value instanceof RegExp) {
					const flags: readonly string[] = (node as Deno.lint.RegExpLiteral).regex.flags.split("");
					if (!flags.includes("u") && !flags.includes("v")) {
						const regexpExpect: string = `/${(node as Deno.lint.RegExpLiteral).regex.pattern}/${(node as Deno.lint.RegExpLiteral).regex.flags}u`;
						context.report({
							node,
							message: `Prefer the regular expression is contain Unicode flag (\`u\` or \`v\`).`,
							hint: `Do you mean \`${regexpExpect}\`?`,
							fix(fixer: Deno.lint.Fixer): Deno.lint.Fix {
								return fixer.replaceText(node, regexpExpect);
							}
						});
					}
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
