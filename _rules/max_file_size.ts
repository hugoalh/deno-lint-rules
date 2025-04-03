import type { DenoLintRuleDataPre } from "../_template.ts";
export interface DenoLintRuleMaxSizeOptions {
	/**
	 * Maximum size of the file, in bytes. Default to 1 MiB.
	 * @default {1048576}
	 */
	maximum?: number;
}
export const data: DenoLintRuleDataPre<DenoLintRuleMaxSizeOptions> = {
	identifier: "max-file-size",
	context(options: DenoLintRuleMaxSizeOptions = {}): Deno.lint.Rule {
		const { maximum = 1048576 }: DenoLintRuleMaxSizeOptions = options;
		if (!(Number.isSafeInteger(maximum) && maximum >= 0)) {
			throw new RangeError(`Parameter \`maximum\` is not a valid number which is integer, positive, and safe!`);
		}
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					Program(node:Deno.lint.Program):void {
						if (context.sourceCode.text.length > maximum) {
							context.report({
								node,
								message: `File too large; Expect: <= ${maximum}, Current: ${context.sourceCode.text.length}.`
							})
						}
					}
				};
			}
		};
	}
};
