import {
	constructVisitorDependSource,
	type RuleData
} from "../_utility.ts";
const regexpPackageScope = /^@[\da-z*\-~][\da-z*\-._~]*$/;
const regexpPackageNameAndTag = /^[\da-z\-._~]+(?:@.+)?$/;
function assertNPMURL(input: URL): boolean | string {
	const {
		hash,
		hostname,
		pathname,
		protocol,
		searchParams,
	}: URL = input;
	const paths: readonly string[] = pathname.split("/").slice(1);
	if (
		!(
			protocol === "http:" ||
			protocol === "https:"
		) ||
		paths.length === 0
	) {
		return false;
	}
	if (
		hostname === "cdn.pika.dev" ||
		hostname === "cdn.skypack.dev" ||
		hostname === "esm.run" ||
		hostname === "esm.sh" ||
		hostname === "unpkg.com"
	) {
		if (regexpPackageScope.test(paths[0]) && regexpPackageNameAndTag.test(paths[1])) {
			return ((paths.length === 2 && searchParams.size === 0 && hash.length === 0) ? `npm:${paths[0]}/${paths[1]}` : true);
		}
		if (regexpPackageNameAndTag.test(paths[0])) {
			return ((paths.length === 1 && searchParams.size === 0 && hash.length === 0) ? `npm:${paths[0]}` : true);
		}
		return false;
	}
	if (hostname === "cdn.jsdelivr.net" && paths[0] === "npm") {
		if (regexpPackageScope.test(paths[1]) && regexpPackageNameAndTag.test(paths[2])) {
			return ((paths.length === 3 && searchParams.size === 0 && hash.length === 0) ? `npm:${paths[1]}/${paths[2]}` : true);
		}
		if (regexpPackageNameAndTag.test(paths[1])) {
			return ((paths.length === 2 && searchParams.size === 0 && hash.length === 0) ? `npm:${paths[1]}` : true);
		}
		return false;
	}
	if ((
		hostname === "jspm.io" ||
		hostname === "dev.jspm.io" ||
		hostname === "ga.jspm.io"
	) && paths[0].startsWith("npm:")) {
		if (regexpPackageScope.test(paths[0].replace("npm:", "")) && regexpPackageNameAndTag.test(paths[1])) {
			return ((paths.length === 2 && searchParams.size === 0 && hash.length === 0) ? `${paths[0]}/${paths[1]}` : true);
		}
		if (regexpPackageNameAndTag.test(paths[0].replace("npm:", ""))) {
			return ((paths.length === 1 && searchParams.size === 0 && hash.length === 0) ? paths[0] : true);
		}
		return false;
	}
	return false;
}
function ruleAssertor(context: Deno.lint.RuleContext, source: Deno.lint.StringLiteral): void {
	const sourceURL: URL | null = URL.parse(source.value);
	const result: boolean | string = (sourceURL === null) ? false : assertNPMURL(sourceURL);
	if (result !== false) {
		const report: Deno.lint.ReportData = {
			node: source,
			message: `Depend module from NPM via URL is forbidden.`
		};
		if (typeof result === "string") {
			report.hint = `Do you mean \`${result}\`?`;
			report.fix = (fixer: Deno.lint.Fixer): Deno.lint.Fix | Iterable<Deno.lint.Fix> => {
				return fixer.replaceText(source, source.raw.replace(source.value, result));
			};
		}
		context.report(report);
	}
}
export const ruleData: RuleData = {
	identifier: "no-depend-from-npm-url",
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
