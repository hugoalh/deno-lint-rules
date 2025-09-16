import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_using.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `class FileHandle {
	constructor(name) {
		this.name = name;
	}
	[Symbol.dispose]() {
		console.log(\`\${this.name} closed\`);
	}
}
function readFile() {
	{
		using file = new FileHandle("data.txt");
	}
}
readFile();
`);
	deepStrictEqual(diagnostics.length, 1);
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", `using server = Deno.serve({ port: 8000 }, () => {
	return new Response("Hello, world!");
});

const response = await fetch("http://localhost:8000");
console.log(await response.text());
`);
	deepStrictEqual(diagnostics.length, 1);
});
