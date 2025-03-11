export function getClosestAncestor(context: Deno.lint.RuleContext, node: Deno.lint.Node): Deno.lint.Node {
	const ancestors: Deno.lint.Node[] = context.sourceCode.getAncestors(node);
	return ancestors[ancestors.length - 1];
}
export function getMemberRootIdentifier(node: Deno.lint.CallExpression | Deno.lint.Expression | Deno.lint.Identifier | Deno.lint.MemberExpression | Deno.lint.NewExpression): Deno.lint.Identifier | null {
	switch (node.type) {
		case "AwaitExpression":
		case "UnaryExpression":
		case "UpdateExpression":
			return getMemberRootIdentifier(node.argument);
		case "CallExpression":
		case "NewExpression":
			return getMemberRootIdentifier(node.callee);
		case "ChainExpression":
		case "TSAsExpression":
		case "TSInstantiationExpression":
		case "TSNonNullExpression":
		case "TSSatisfiesExpression":
		case "TSTypeAssertion":
			return getMemberRootIdentifier(node.expression);
		case "ClassExpression":
		case "FunctionExpression":
			if (node.id !== null) {
				return getMemberRootIdentifier(node.id);
			}
			break;
		case "Identifier":
			return node;
		case "MemberExpression":
			return getMemberRootIdentifier(node.object);
		case "TaggedTemplateExpression":
			return getMemberRootIdentifier(node.tag);
		case "YieldExpression":
			if (node.argument !== null) {
				return getMemberRootIdentifier(node.argument);
			}
			break;
	}
	return null;
}
