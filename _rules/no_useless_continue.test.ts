import { assertEquals } from "STD/assert/equals";
import { data } from "./no_useless_continue.ts";
import { constructDenoLintPlugin } from "../_template.ts";
const rule = constructDenoLintPlugin({
	[data.identifier]: data.context()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `let text = "";
for (let i = 0; i < 10; i += 1) {
	text = text + i;
	continue;
}
console.log(text);
//=> "0123456789"`);
	assertEquals(diagnostics.length, 1);
});
Deno.test("Valid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `let text = "";
for (let i = 0; i < 10; i += 1) {
	text = text + i;
}
console.log(text);
//=> "0123456789"`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Valid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `let text = "";
for (let i = 0; i < 10; i += 1) {
	if (i === 3) {
		continue;
	}
	text = text + i;
}
console.log(text);
//=>"012456789"`);
	assertEquals(diagnostics.length, 0);
});
Deno.test("Valid 3", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "test.ts", `let i = 0;
let j = 8;
checkIAndJ: while (i < 4) {
	console.log(\`i: \${i}\`);
	i += 1;
	checkJ: while (j > 4) {
		console.log(\`j: \${j}\`);
		j -= 1;
		if (j % 2 === 0) {
			continue checkJ;
		}
		console.log(\`\${j} is odd.\`);
	}
	console.log(\`i = \${i}\`);
	console.log(\`j = \${j}\`);
}`);
	assertEquals(diagnostics.length, 0);
});
