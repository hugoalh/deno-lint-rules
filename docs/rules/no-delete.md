# `hugoalh/no-delete`

Forbid use of [delete][ecmascript-delete].

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const employee = {
    firstName: "Maria",
    lastName: "Sanchez"
  };
  console.log(employee.firstName);
  //=> "Maria"

  delete employee.firstName;
  console.log(employee.firstName);
  //=> undefined
  ```
- ```ts
  /* ❌ INVALID */
  // Creates the property empCount on the global scope.
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
  ```

## 📜 History

- **v0.8.0:** Add.

[ecmascript-delete]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
