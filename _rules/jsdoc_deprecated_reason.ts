import {
	dissectNodeJSDoc,
	type NodeJSDocDissect,
	type RuleData
} from "../_utility.ts";
const directive: string = "@deprecated";
const ruleMessage: string = `Require the JSDoc \`@deprecated\` tag have a reason.`;
export const ruleData: RuleData = {
	identifier: "jsdoc-deprecated-reason",
	tags: [
		"jsdoc",
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					// NOTE: `Block` visitor does not work as of written.
					Program(): void {
						for (const node of context.sourceCode.getAllComments().filter((comment: Deno.lint.BlockComment | Deno.lint.LineComment): comment is Deno.lint.BlockComment => {
							return (comment.type === "Block");
						})) {
							const doc: NodeJSDocDissect[] | undefined = dissectNodeJSDoc(node);
							if (typeof doc !== "undefined") {
								for (const {
									rangeValue,
									value
								} of doc.filter(({ value }: NodeJSDocDissect): boolean => {
									return value.startsWith(directive);
								})) {
									if (value === directive) {
										context.report({
											range: rangeValue,
											message: ruleMessage
										});
									} else if (value.startsWith(`${directive} `)) {
										const reason: string = value.replace(directive, "").trim();
										if (reason.length === 0) {
											context.report({
												range: rangeValue,
												message: ruleMessage
											});
										}
									}
								}
							}
						}
					}
				};
			}
		};
	}
};
