import { assertEquals } from "STD/assert/equals";
import { data } from "./no_useless_switch.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `switch (Deno.build.os) {
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `switch (Deno.build.os) {
	case "windows":
		doSomething();
		break;
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `switch (Deno.build.os) {
	case "windows":
		doSomething();
		break;
	default:
		doAnotherSomething();
		break;
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Invalid 4", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = [1, 2];
	switch (foo.length) {
		case 0:
		case 1:
			doSomething();
			break;
		case 2:
		case 3:
		case 4:
		default:
			doAnotherSomething();
			break;
	}`);
	assertEquals(diagnostics.length, 3);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `switch (Deno.build.os) {
	case "darwin":
		doSomething();
		break;
	case "windows":
		doAnotherSomething();
		break;
}`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = [1, 2];
	switch (foo.length) {
		case 0:
		case 1:
			doSomething();
			break;
		default:
			doAnotherSomething();
			break;
	}`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const foo = [1, 2];
	switch (foo.length) {
		case 0:
		case 1:
			doSomething();
			break;
		case 2:
		case 3:
		case 4:
			doMoreSomething();
		default:
			doAnotherSomething();
			break;
	}`);
	assertEquals(diagnostics.length, 0);
});
