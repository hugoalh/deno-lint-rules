# `hugoalh/no-useless-class-constructor`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid useless [class constructor][ecmascript-class-constructor].

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  class Foo {
    constructor() {
    }
  }

  /* ✔️ VALID */
  class Foo {
    constructor() {
      doSomething();
    }
  }
  ```

## 📚 References

- [ESLint rule `no-useless-constructor`](https://eslint.org/docs/latest/rules/no-useless-constructor)

[ecmascript-class-constructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor
