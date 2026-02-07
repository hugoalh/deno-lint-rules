import {
	dissectNodeJSDocLine,
	getVisualPositionFromNode,
	visitNodeBlockComment,
	type NodeJSDocDissect,
	type RuleData,
	type VisualPosition
} from "../_utility.ts";
class FormatJSDocMessageService {
	blockStartInNewLine: number = 0;
	contentStartInNewLine: number = 0;
	contentEndInNewLine: number = 0;
	indent: number = 0;
	conclusion(): string | undefined {
		const count: number = this.blockStartInNewLine + this.contentStartInNewLine + this.contentEndInNewLine + this.indent;
		if (count === 0) {
			return;
		}
		const messages: string[] = [`JSDoc is not in well format [${count}]:`];
		if (this.blockStartInNewLine > 0) {
			let message: string = `- Should in new line`;
			if (this.blockStartInNewLine > 1) {
				message += ` * ${this.blockStartInNewLine}`;
			}
			messages.push(message);
		}
		if (this.contentStartInNewLine > 0) {
			let message: string = `- Content should start with new line`;
			if (this.contentStartInNewLine > 1) {
				message += ` * ${this.contentStartInNewLine}`;
			}
			messages.push(message);
		}
		if (this.contentEndInNewLine > 0) {
			let message: string = `- Content should end with new line`;
			if (this.contentEndInNewLine > 1) {
				message += ` * ${this.contentEndInNewLine}`;
			}
			messages.push(message);
		}
		if (this.indent > 0) {
			let message: string = `- Line is not well indent`;
			if (this.indent > 1) {
				message += ` * ${this.indent}`;
			}
			messages.push(message);
		}
		return messages.join("\n");
	}
}
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
								const messager: FormatJSDocMessageService = new FormatJSDocMessageService();
								const fixers: ((fixer: Deno.lint.Fixer) => Deno.lint.Fix)[] = [];
								if (!isInNewLine) {
									messager.blockStartInNewLine += 1;
									fixers.push((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
										return fixer.insertTextBefore(node, "\n");
									});
								}
								if (lines.length > 1) {
									const frontIndent: string = `${isInNewLine ? frontRaw : ""} * `;
									for (let index: number = 0; index < lines.length; index += 1) {
										const line: NodeJSDocDissect = lines[index];
										const frontRange: Deno.lint.Range = [line.raw.range[0], line.cooked.range[0]];
										if (index === 0) {
											if (line.cooked.value.trim().length !== 0) {
												messager.contentStartInNewLine += 1;
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
													messager.contentEndInNewLine += 1;
													fixers.push((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
														return fixer.replaceTextRange(line.raw.range, frontIndentLast);
													});
												}
											} else {
												if (line.raw.value.slice(0, frontRange[1] - frontRange[0]) !== frontIndent) {
													messager.indent += 1;
													fixers.push((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
														return fixer.replaceTextRange(frontRange, frontIndent);
													});
												}
												messager.contentEndInNewLine += 1;
												fixers.push((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
													return fixer.replaceTextRange([line.cooked.range[1], node.range[1] - 2], `\n${frontIndentLast}`);
												});
											}
											continue;
										}
										if (line.raw.value.slice(0, frontRange[1] - frontRange[0]) !== frontIndent) {
											messager.indent += 1;
											fixers.push((fixer: Deno.lint.Fixer): Deno.lint.Fix => {
												return fixer.replaceTextRange(frontRange, frontIndent);
											});
										}
									}
								}
								const message: string | undefined = messager.conclusion();
								if (typeof message !== "undefined") {
									const report: Deno.lint.ReportData = {
										node,
										message
									};
									if (fixers.length > 0) {
										report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
											return fixers.map((subfix: (fixer: Deno.lint.Fixer) => Deno.lint.Fix): Deno.lint.Fix => {
												return subfix(fixer);
											}).reverse();
										};
									}
									context.report(report);
								}
							}
						}
					}
				};
			}
		};
	}
};
