import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "prefer-ignore-have-reason",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Line(node: Deno.lint.LineComment): void {
						const comment: string = node.value.trim();
						if (
							comment.startsWith("deno-lint-ignore ") ||
							comment.startsWith("deno-lint-ignore-file ")
						) {
							const parts: readonly string[] = comment.split(" ").slice(1);
							const dashesSeparatorIndex: number = parts.indexOf("--");
							if (
								dashesSeparatorIndex === -1 ||
								dashesSeparatorIndex === parts.length - 1
							) {
								context.report({
									node,
									message: `Prefer ignore directive have reason.`
								});
							}
						}
					}
				};
			}
		};
	}
};
