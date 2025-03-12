import { assertEquals } from "STD/assert/equals";
import { data } from "./prefer_ascii_identifier.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("class Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class Cafè {}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("class Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `class Cafe {}`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("const Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const cafè = "foo";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("const Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const cafe = "foo";`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("enum Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `enum Cafè {}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("enum Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `enum Cafe {}`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("function Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function cafè() {}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("function Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `function cafe() {}`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("import Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import cafè from "jsr:@hugoalh/cafe";`);
	assertEquals(diagnostics.length, 1);
	const diagnostic = diagnostics[0];
	assertEquals(diagnostic.id, `hugoalh/${data.identifier}`);
});
Deno.test("import Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `import cafe from "jsr:@hugoalh/cafe";`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("interface Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `interface Cafè {}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("interface Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `interface Cafe {}`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("let Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `let cafè = "foo";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("let Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `let cafe = "foo";`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("type Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `type Cafè = 0 | 1 | 2;`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("type Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `type Cafe = 0 | 1 | 2;`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("var Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `var cafè = "foo";`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("var Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `var cafe = "foo";`);
	assertEquals(diagnostics.length, 0);
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
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", sample);
	assertEquals(diagnostics.length, 4);
	assertEquals(sample.slice(...diagnostics[0].range), "π");
	assertEquals(sample.slice(...diagnostics[1].range), "こんにちは");
	assertEquals(sample.slice(...diagnostics[2].range), "名前");
	assertEquals(sample.slice(...diagnostics[3].range), "名前");
});
