import {
	NodeSerializer,
	type RuleData
} from "../_utility.ts";
const serializer: NodeSerializer = new NodeSerializer();
function ruleAssertor(context: Deno.lint.RuleContext, node: Deno.lint.ExportAllDeclaration | Deno.lint.ExportNamedDeclaration | Deno.lint.ImportDeclaration): void {
	for (const attribute of node.attributes) {
		if (serializer.forKey(attribute.key) === "type" && attribute.value.value === "bytes") {
			context.report({
				node,
				message: `Depend file or script with bytes type is forbidden.`
			});
		}
	}
}
export const ruleData: RuleData = {
	identifier: "no-depend-type-bytes",
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ExportAllDeclaration(node: Deno.lint.ExportAllDeclaration): void {
						ruleAssertor(context, node);
					},
					ExportNamedDeclaration(node: Deno.lint.ExportNamedDeclaration): void {
						ruleAssertor(context, node);
					},
					ImportDeclaration(node: Deno.lint.ImportDeclaration): void {
						ruleAssertor(context, node);
					}
				};
			}
		};
	}
};
