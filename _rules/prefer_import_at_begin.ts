import type { DenoLintRuleDataPre } from "../_template.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			Program(node: Deno.lint.Program): void {
				let doneValidImports: boolean = false;
				for (const body of node.body) {
					if (body.type === "ImportDeclaration") {
						if (doneValidImports) {
							context.report({
								node: body,
								message: `Prefer statements \`import\` at the begin of the file.`
							});
						}
					} else {
						doneValidImports = true;
					}
				}
			}
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "prefer-import-at-begin",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
