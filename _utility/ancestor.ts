export function getClosestAncestor(context: Deno.lint.RuleContext, node: Deno.lint.Node): Deno.lint.Node {
	const ancestors: Deno.lint.Node[] = context.sourceCode.getAncestors(node);
	return ancestors[ancestors.length - 1];
}
