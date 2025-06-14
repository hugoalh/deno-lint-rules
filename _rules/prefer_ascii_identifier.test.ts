import { deepStrictEqual } from "node:assert";
import { ruleData } from "./prefer_ascii_identifier.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("class Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `class Cafè {}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("class Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `class Cafe {}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("const Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const cafè = "foo";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("const Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const cafe = "foo";`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("enum Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `enum Cafè {}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("enum Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `enum Cafe {}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("function Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `function cafè() {}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("function Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `function cafe() {}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("import Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import cafè from "jsr:@hugoalh/cafe";`);
	deepStrictEqual(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	deepStrictEqual(diagnostic.id, `hugoalh/${ruleData.identifier}`);
});
Deno.test("import Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `import cafe from "jsr:@hugoalh/cafe";`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("interface Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `interface Cafè {}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("interface Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `interface Cafe {}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("let Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `let cafè = "foo";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("let Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `let cafe = "foo";`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("type Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `type Cafè = 0 | 1 | 2;`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("type Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `type Cafe = 0 | 1 | 2;`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("var Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `var cafè = "foo";`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("var Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `var cafe = "foo";`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Deno `prefer-ascii` Example", { permissions: "none" }, () => {
	const sample = `const π = Math.PI;

// string literals are also checked
const ninja = "🥷";

function こんにちは(名前: string) {
	console.log(\`こんにちは、\${名前}さん\`);
}

// “comments” are also checked
// ^        ^
// |        U+201D
// U+201C
`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 4);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "π");
	deepStrictEqual(sample.slice(...diagnostics[1].range), "こんにちは");
	deepStrictEqual(sample.slice(...diagnostics[2].range), "名前");
	deepStrictEqual(sample.slice(...diagnostics[3].range), "名前");
});
