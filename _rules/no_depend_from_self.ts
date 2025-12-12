import {
	basename as getPathBasename,
	dirname as getPathDirname,
	resolve as resolvePath
} from "node:path";
import {
	fileURLToPath as convertFileURLToPath,
	pathToFileURL as convertPathToFileURL
} from "node:url";
import {
	constructVisitorDependSource,
	type RuleData
} from "../_utility.ts";
function isDependFromFileUrlLike(pattern: string, source: string): boolean {
	return (
		source === pattern ||
		(source.startsWith(pattern) && (
			source.charAt(pattern.length) === "#" ||
			source.charAt(pattern.length) === "?"
		))
	);
}
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	try {
		const contextFileUrl: string = convertPathToFileURL(context.filename).href;
		if (
			isDependFromFileUrlLike(`./${getPathBasename(context.filename)}`, source.value) ||
			(source.value.startsWith(".") && isDependFromFileUrlLike(contextFileUrl, convertPathToFileURL(resolvePath(getPathDirname(context.filename), source.value)).href)) ||
			(source.value.startsWith("/") && isDependFromFileUrlLike(contextFileUrl, convertPathToFileURL(resolvePath(source.value)).href)) ||
			(source.value.startsWith("file:") && isDependFromFileUrlLike(contextFileUrl, convertPathToFileURL(convertFileURLToPath(source.value)).href))
		) {
			context.report({
				node: source,
				message: `Depend self is forbidden.`
			});
		}
	} catch {
		// CONTINUE
	}
}
export const ruleData: RuleData = {
	identifier: "no-depend-from-self",
	tags: [
		"recommended"
	],
	querier(): Deno.lint.Rule {
		return {
			create(context: Deno.lint.RuleContext): Deno.lint.LintVisitor {
				return constructVisitorDependSource(ruleAssertor.bind(null, context));
			}
		};
	}
};
