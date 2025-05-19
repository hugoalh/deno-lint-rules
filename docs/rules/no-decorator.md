# `hugoalh/no-decorator`

Forbid use of [decorator][ecmascript-decorator].

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  function first() {
    console.log("first(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("first(): called");
    };
  }
  function second() {
    console.log("second(): factory evaluated");
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log("second(): called");
    };
  }
  class ExampleClass {
    @first()
    @second()
    method() {}
  }
  ```

## 📜 History

- **v0.8.0:** Add.

[ecmascript-decorator]: https://www.typescriptlang.org/docs/handbook/decorators.html
