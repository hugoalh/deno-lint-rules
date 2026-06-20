import {
	NodeSerializer,
	NodeVisualPosition,
	type RuleConstructContext
} from "../_utility.ts";
const serializer: NodeSerializer = new NodeSerializer();
export default {
	identifier: "no-duplicate-spreads",
	tags: [
		"mistake",
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					ObjectExpression(node: Deno.lint.ObjectExpression): void {
						const spreads: readonly Deno.lint.SpreadElement[] = node.properties.filter((property: Deno.lint.Property | Deno.lint.SpreadElement): property is Deno.lint.SpreadElement => {
							return (property.type === "SpreadElement");
						});
						if (spreads.length > 1) {
							const spreadsSerialize: readonly string[] = spreads.map((spread: Deno.lint.SpreadElement): string => {
								return serializer.for(spread);
							});
							const spreadsPosition: readonly string[] = spreads.map((spread: Deno.lint.SpreadElement): string => {
								return new NodeVisualPosition(context, [spread.range[0], spread.argument.range[1]]).toString();
							});
							for (let index: number = 1; index < spreads.length; index += 1) {// Index 0 is always unique.
								const elementsIndexDuplicated: number = spreadsSerialize.slice(0, index).indexOf(spreadsSerialize[index]);
								if (elementsIndexDuplicated !== -1) {
									const spread: Deno.lint.SpreadElement = spreads[index];
									context.report({
										range: [spread.range[0], spread.argument.range[1]],
										message: `Multiple same spread element in the object is possibly not intended.`,
										hint: `The first position with same spread element: ${spreadsPosition[elementsIndexDuplicated]}`
									});
								}
							}
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
