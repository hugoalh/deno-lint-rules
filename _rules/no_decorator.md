# `hugoalh/no-decorator`

Forbid use of [decorator][ecmascript-decorator].

This rule is aimed for whose have [Baseline][ecmascript-baseline] requirement.

## 🏷️ Tags

*This rule does not have any tag.*

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

[ecmascript-baseline]: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility
[ecmascript-decorator]: https://www.typescriptlang.org/docs/handbook/decorators.html
