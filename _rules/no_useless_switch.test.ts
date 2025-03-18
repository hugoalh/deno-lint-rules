import { assertEquals } from "STD/assert/equals";
import { data } from "./no_useless_switch.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Empty Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `switch (Deno.build.os) {
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("1 Case Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `switch (Deno.build.os) {
	case "windows":
		doSomething();
		break;
}`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("2 Cases Invalid 1", { permissions: "none" }, () => {
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
Deno.test("2 Cases Valid 1", { permissions: "none" }, () => {
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
