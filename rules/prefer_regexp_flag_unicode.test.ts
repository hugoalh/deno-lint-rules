import { assertEquals } from "STD/assert/equals";
import { data } from "./prefer_regexp_flag_unicode.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin([{
	context: data.context(),
	identifier: data.identifier
}]);
Deno.test("Invalid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const a = /aaa/;
const b = /bbb/gi;
const c = new RegExp("ccc");
const d = new RegExp("ddd", "gi");`);
	assertEquals(diagnostics.length, 2);
	assertEquals(diagnostics[0].fix?.[0].text, `/aaa/u`);
	assertEquals(diagnostics[1].fix?.[0].text, `/bbb/giu`);
});
Deno.test("Valid", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `const a = /aaa/u;
const b = /bbb/giu;
const c = new RegExp("ccc", "u");
const d = new RegExp("ddd", "giu");

const e = /aaa/v;
const f = /bbb/giv;
const g = new RegExp("ccc", "v");
const h = new RegExp("ddd", "giv");

// This rule ignores RegExp calls if the flags could not be evaluated to a static value.
function i(flags) {
	return new RegExp("eee", flags)
}
`);
	assertEquals(diagnostics.length, 0);
});
