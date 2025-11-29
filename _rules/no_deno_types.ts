import type { RuleData } from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "no-deno-types",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					// NOTE: `Line` visitor does not work as of written.
					Program(): void {
						for (const node of context.sourceCode.getAllComments().filter((comment: Deno.lint.BlockComment | Deno.lint.LineComment): comment is Deno.lint.LineComment => {
							return (comment.type === "Line");
						})) {
							if (node.value.trim().startsWith("@deno-types")) {
								const expect: string = node.value.replace("@deno-types", "@ts-types");
								context.report({
									node,
									message: `Use of \`@deno-types\` directive is forbidden; Use \`@ts-types\` instead.`,
									hint: `Do you mean \`${expect}\`?`,
									fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
										return fixer.replaceText(node, `//${expect}`);
									}
								});
							}
						}
					}
				};
			}
		};
	}
};
