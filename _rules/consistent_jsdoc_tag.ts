import {
	dissectNodeJSDocBlock,
	visitNodeBlockComment,
	type RuleConstructContext
} from "../_utility.ts";
const jsdocTagsSynonymsDefault: Record<string, string> = {
	"arg": "param",
	"argument": "param",
	"augments": "extends",
	"const": "constant",
	"defaultvalue": "default",
	"defaultValue": "default",
	"desc": "description",
	"exception": "throws",
	"func": "function",
	"prop": "property",
	"return": "returns",
	"typeparam": "template",
	"typeParam": "template",
	"virtual": "abstract",
	"yield": "yields"
};
export interface RuleConsistentJSDocTagOptions {
	/**
	 * Configure JSDoc tag synonyms, in pair of target (key) and replacement (value), define replacement (value) with `false`, `null`, or `undefined` to disable default target (key) replacement.
	 * 
	 * Prefix with `@` is optional.
	 */
	synonyms?: Record<string, string | false | null | undefined>;
}
export default {
	identifier: "consistent-jsdoc-tag",
	tags: [
		"jsdoc",
		"recommended"
	],
	querier(payload: unknown = {}): Deno.lint.Rule {
		const { synonyms }: RuleConsistentJSDocTagOptions = payload as RuleConsistentJSDocTagOptions;
		const jsdocTagsSynonyms: Record<string, string> = Object.fromEntries(Object.entries({
			...jsdocTagsSynonymsDefault,
			...synonyms
		}).map(([key, value]: [string, string | false | null | undefined]): [string, string] | undefined => {
			if (typeof value !== "string") {
				return;
			}
			return [
				key.startsWith("@") ? key.slice(1) : key,
				value.startsWith("@") ? value.slice(1) : value
			];
		}).filter((entry: [string, string] | undefined): entry is [string, string] => {
			return (typeof entry !== "undefined");
		}));
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return {
					// NOTE: `Block` visitor does not work as of written.
					Program(): void {
						for (const node of visitNodeBlockComment(context)) {
							for (const block of (dissectNodeJSDocBlock(node) ?? [])) {
								const valueTrim: string = block.cooked.value.trim();
								if (valueTrim.startsWith("@")) {
									const tagCurrent: string = valueTrim.split(/\s+/g)[0].slice(1);
									const tagExpect: string | undefined = jsdocTagsSynonyms[tagCurrent];
									if (typeof tagExpect !== "undefined") {
										const rangeBegin: number = block.cooked.range[0] + block.cooked.value.indexOf(tagCurrent) - 1;
										const range: Deno.lint.Range = [rangeBegin, rangeBegin + 1 + tagCurrent.length];
										context.report({
											range,
											message: `JSDoc tag \`@${tagCurrent}\` is the synonym of \`@${tagExpect}\`. Use of JSDoc synonym tag is forbidden.`,
											hint: `Do you mean \`@${tagExpect}\`?`,
											fix(fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> {
												return fixer.replaceTextRange(range, `@${tagExpect}`);
											}
										});
										break;
									}
								}
							}
						}
					}
				};
			}
		};
	}
} satisfies RuleConstructContext as RuleConstructContext;
