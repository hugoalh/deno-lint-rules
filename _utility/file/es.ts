export function isFileES(context: Deno.lint.RuleContext): boolean {
	return (
		context.filename.endsWith(".js") ||
		context.filename.endsWith(".jsx") ||
		context.filename.endsWith(".mjs") ||
		context.filename.endsWith(".mts") ||
		context.filename.endsWith(".ts") ||
		context.filename.endsWith(".tsx")
	);
}
