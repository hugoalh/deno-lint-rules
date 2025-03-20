import { assertEquals } from "STD/assert/equals";
import { data } from "./no_duplicate_typeofs.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `typeof typeof globalThis;`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, "typeof globalThis");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `typeof typeof typeof typeof typeof typeof typeof typeof typeof typeof globalThis;`);
	assertEquals(diagnostics.length, 1);
	assertEquals(diagnostics[0].fix?.[0].text, "typeof globalThis");
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `typeof globalThis;`);
	assertEquals(diagnostics.length, 0);
});
