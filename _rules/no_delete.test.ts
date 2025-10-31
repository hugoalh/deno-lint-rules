import { deepStrictEqual } from "node:assert";
import { ruleData } from "./no_delete.ts";
import { constructPlugin } from "../_utility.ts";
const rule = constructPlugin({
	[ruleData.identifier]: ruleData.querier()
});
Deno.test("Invalid 1", { permissions: "none" }, () => {
	const sample = `const employee = {
	firstName: "Maria",
	lastName: "Sanchez"
};

console.log(employee.firstName);
//=> "Maria"

delete employee.firstName;

console.log(employee.firstName);
//=> undefined
`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 1);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "delete employee.firstName");
});
Deno.test("Invalid 2", { permissions: "none" }, () => {
	const sample = `// Creates the property empCount on the global scope.
// Since we are using var, this is marked as non-configurable.
var empCount = 43;

// Creates the property EmployeeDetails on the global scope.
// Since it was defined without "var", it is marked configurable.
EmployeeDetails = {
	name: "xyz",
	age: 5,
	designation: "Developer"
};

// delete can be used to remove properties from objects.
delete EmployeeDetails.name; // returns true

// Even when the property does not exist, delete returns "true".
delete EmployeeDetails.salary; // returns true

// EmployeeDetails is a property of the global scope.
delete EmployeeDetails; // returns true

// On the contrary, empCount is not configurable
// since var was used.
delete empCount; // returns false

// delete also does not affect built-in static properties
// that are non-configurable.
delete Math.PI; // returns false

function f() {
	var z = 44;

	// delete doesn't affect local variable names
	delete z; // returns false
}
`;
	const diagnostics = Deno.lint.runPlugin(rule, "foo.ts", sample);
	deepStrictEqual(diagnostics.length, 6);
	deepStrictEqual(sample.slice(...diagnostics[0].range), "delete EmployeeDetails.name");
	deepStrictEqual(sample.slice(...diagnostics[1].range), "delete EmployeeDetails.salary");
	deepStrictEqual(sample.slice(...diagnostics[2].range), "delete EmployeeDetails");
	deepStrictEqual(sample.slice(...diagnostics[3].range), "delete empCount");
	deepStrictEqual(sample.slice(...diagnostics[4].range), "delete Math.PI");
	deepStrictEqual(sample.slice(...diagnostics[5].range), "delete z");
});
