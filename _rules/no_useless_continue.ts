import type { DenoLintRuleDataPre } from "../_template.ts";
function ruleAssertor(context: Deno.lint.RuleContext, node: Deno.lint.DoWhileStatement | Deno.lint.ForInStatement | Deno.lint.ForOfStatement | Deno.lint.ForStatement | Deno.lint.WhileStatement): void {
	if (node.body.type === "BlockStatement") {
		const blockLastStatement: Deno.lint.Statement = node.body.body[node.body.body.length - 1];
		if (blockLastStatement.type === "ContinueStatement" && blockLastStatement.label === null) {
			context.report({
				node: blockLastStatement,
				message: `The statement \`continue\` at the end of the loop statement and without label is useless.`,
				fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
					return fixer.remove(blockLastStatement);
				}
			});
		}
	}
}
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		const ruleAssertorBind = ruleAssertor.bind(null, context);
		return {
			DoWhileStatement: ruleAssertorBind,
			ForInStatement: ruleAssertorBind,
			ForOfStatement: ruleAssertorBind,
			ForStatement: ruleAssertorBind,
			WhileStatement: ruleAssertorBind
		};
	}
};
export const data: DenoLintRuleDataPre = {
	identifier: "no-useless-continue",
	recommended: true,
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
