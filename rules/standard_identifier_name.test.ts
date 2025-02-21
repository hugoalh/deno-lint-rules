import { assertEquals } from "STD/assert/equals";
import ruleStandardIdentifierName from "./standard_identifier_name.ts";
Deno.test("class", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleStandardIdentifierName, "test.ts", `class Test {}\nclass Cafè {}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("const", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleStandardIdentifierName, "test.ts", `const test = 10;\nconst cafè = "foo";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("enum", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleStandardIdentifierName, "test.ts", `enum Test {}\nenum Cafè {}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("function", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleStandardIdentifierName, "test.ts", `function test() {}\nfunction cafè() {}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("import", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleStandardIdentifierName, "test.ts", `import path from "node:path";\nimport cafè from "npm:@hugoalh/fake";`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, "hugoalh/standard-identifier-name");
});
Deno.test("interface", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleStandardIdentifierName, "test.ts", `interface Test {}\ninterface Cafè {}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("let", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleStandardIdentifierName, "test.ts", `let test = 10;\nlet cafè = "foo";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("type", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleStandardIdentifierName, "test.ts", `type Test = 0 | 1 | 2;\ntype Cafè = 0 | 1 | 2;`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("var", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(ruleStandardIdentifierName, "test.ts", `var test = 10;\nvar cafè = "foo";`);
	assertEquals(diagnostics.length, 1);
});
