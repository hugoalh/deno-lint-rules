import {
	dissectNodeJSDocLine,
	getVisualPositionFromNode,
	visitNodeBlockComment,
	type NodeJSDocDissect,
	type RuleData,
	type VisualPosition
} from "../_utility.ts";
export const ruleData: RuleData = {
	identifier: "fmt-jsdoc",
	tags: [
		"fmt",
		"jsdoc",
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					// NOTE: `Block` visitor does not work as of written.
					Program(): void {
						for (const node of visitNodeBlockComment(context)) {
							const lines: NodeJSDocDissect[] | undefined = dissectNodeJSDocLine(node);
							if (typeof lines !== "undefined") {
								const position: VisualPosition = getVisualPositionFromNode(context, node);
								const frontRaw: string = context.sourceCode.text.split("\n")[position.lineBegin - 1].slice(0, position.columnBegin - 1);
								const isInNewLine: boolean = frontRaw.trim().length === 0;
								const submessages: Set<string> = new Set<string>();
								const fixers: ((fixer: Deno.lint.Fixer) => Deno.lint.Fix)[] = [];

								// New Line
								if (!isInNewLine) {
									submessages.add(`JSDoc should in new line.`);
									fixers.push((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
										return fixer.insertTextBefore(node, "\n");
									});
								}

								// Indent
								if (lines.length > 1) {
									const frontIndent: string = `${isInNewLine ? frontRaw : ""} * `;
									for (let index: number = 0; index < lines.length; index += 1) {
										const line: NodeJSDocDissect = lines[index];
										const frontRange: Deno.lint.Range = [line.raw.range[0], line.cooked.range[0]];
										if (index === 0) {
											if (line.cooked.value.trim().length !== 0) {
												submessages.add(`JSDoc content should start with new line.`);
												fixers.push((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
													return fixer.replaceTextRange(frontRange, `\n${frontIndent}`);
												});
											}
											continue;
										}
										if (index === lines.length - 1) {
											const frontIndentLast: string = frontIndent.slice(0, -2);
											if (line.cooked.value.trim().length === 0) {
												if (line.raw.value !== frontIndentLast) {
													submessages.add(`JSDoc content should end with new line.`);
													fixers.push((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
														return fixer.replaceTextRange(line.raw.range, frontIndentLast);
													});
												}
											} else {
												if (line.raw.value.slice(0, frontRange[1] - frontRange[0]) !== frontIndent) {
													submessages.add(`JSDoc line is not well indent.`);
													fixers.push((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
														return fixer.replaceTextRange(frontRange, frontIndent);
													});
												}
												submessages.add(`JSDoc content should end with new line.`);
												fixers.push((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
													return fixer.replaceTextRange([line.cooked.range[1], node.range[1] - 2], `\n${frontIndentLast}`);
												});
											}
											continue;
										}
										if (line.raw.value.slice(0, frontRange[1] - frontRange[0]) !== frontIndent) {
											submessages.add(`JSDoc line is not well indent.`);
											fixers.push((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
												return fixer.replaceTextRange(frontRange, frontIndent);
											});
										}
									}
								}

								if (submessages.size > 0) {
									context.report({
										node,
										message: `JSDoc is not in well format [${submessages.size}]:\n${Array.from(submessages.values()).map((submessage: string): string => {
											return `- ${submessage}`;
										}).join("\n")}`,
										fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
											return fixers.map((subfix: (fixer: Deno.lint.Fixer) => Deno.lint.Fix): Deno.lint.Fix => {
												return subfix(fixer);
											}).reverse();
										}
									});
								}
							}
						}
					}
				};
			}
		};
	}
};
