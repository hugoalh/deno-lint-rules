import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_useless_switch.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `switch (Deno.build.os) {
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `switch (Deno.build.os) {
	case "windows":
		doSomething();
		break;
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `switch (Deno.build.os) {
	case "windows":
		doSomething();
		break;
	default:
		doAnotherSomething();
		break;
}`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 4", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = [1, 2];
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
	deepStrictEqual(diagnostics.length, 3);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `switch (Deno.build.os) {
	case "darwin":
		doSomething();
		break;
	case "windows":
		doAnotherSomething();
		break;
}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = [1, 2];
	switch (foo.length) {
		case 0:
		case 1:
			doSomething();
			break;
		default:
			doAnotherSomething();
			break;
	}`);
	deepStrictEqual(diagnostics.length, 0);
});
Deno.test("Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `const foo = [1, 2];
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
	deepStrictEqual(diagnostics.length, 0);
});
