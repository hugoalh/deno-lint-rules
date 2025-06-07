import {
	getContextTextFromNodes,
	isBlockHasDeclaration,
	type RuleData
} from "../_utility.ts";
const ruleContext: Deno.lint.Rule = {
	create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
		return {
			TryStatement(node: Deno.lint.TryStatement): void {
				const isCatchExist: boolean = node.handler !== null;
				const isCatchUseless: boolean = isCatchExist && (
					node.handler!.body.body.length === 0 ||
					(node.handler!.param?.type === "Identifier" && node.handler!.body.body[0].type === "ThrowStatement" && node.handler!.body.body[0].argument.type === "Identifier" && node.handler!.body.body[0].argument.name === node.handler!.param.name)
				);
				const isFinallyExist: boolean = node.finalizer !== null;
				const isFinallyUseless: boolean = isFinallyExist && node.finalizer!.body.length === 0;
				const fixerDefault: Deno.lint.ReportData["fix"] = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
					return fixer.replaceText(node, isBlockHasDeclaration(node.block) ? context.sourceCode.getText(node.block) : getContextTextFromNodes(context, node.block.body));
				};
				if (isCatchUseless && isFinallyUseless) {
					context.report({
						node,
						message: `The statement \`try-catch-finally\` is useless.`,
						fix: fixerDefault
					});
				} else if (isCatchUseless) {
					context.report({
						node: isFinallyExist ? node.handler! : node,
						message: `The statement \`try-catch\` is useless.`,
						fix: isFinallyExist ? (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
							return fixer.remove(node.handler!);
						} : fixerDefault
					});
				} else if (isFinallyUseless) {
					context.report({
						node: isCatchExist ? node.finalizer! : node,
						message: `The statement \`try-finally\` is useless.`,
						fix: isCatchExist ? (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
							return fixer.remove(node.finalizer!);
						} : fixerDefault
					});
				}
			}
		};
	}
};
export const ruleData: RuleData = {
	identifier: "no-useless-try",
	sets: [
		"recommended"
	],
	context(): Deno.lint.Rule {
		return ruleContext;
	}
};
