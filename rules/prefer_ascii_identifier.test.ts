import { assertEquals } from "STD/assert/equals";
import { data } from "./prefer_ascii_identifier.ts";
import { constructDenoLintPlugin } from "../_utility.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("class Invalid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class Cafè {}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("class Valid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class Cafe {}`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("const Invalid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const cafè = "foo";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("const Valid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const cafe = "foo";`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("enum Invalid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `enum Cafè {}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("enum Valid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `enum Cafe {}`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("function Invalid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function cafè() {}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("function Valid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function cafe() {}`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("import Invalid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import cafè from "jsr:@hugoalh/cafe";`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, `hugoalh/${data.identifier}`);
});
Deno.test("import Valid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import cafe from "jsr:@hugoalh/cafe";`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("interface Invalid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `interface Cafè {}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("interface Valid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `interface Cafe {}`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("let Invalid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `let cafè = "foo";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("let Valid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `let cafe = "foo";`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("type Invalid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `type Cafè = 0 | 1 | 2;`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("type Valid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `type Cafe = 0 | 1 | 2;`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("var Invalid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `var cafè = "foo";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("var Valid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `var cafe = "foo";`);
	assertEquals(diagnostics.length, 0);
});
