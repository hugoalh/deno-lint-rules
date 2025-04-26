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
    ...
  }

  /* ✔️ VALID */
  class Foo {
    constructor() {
      doSomething();
    }
    ...
  }

  /* ✔️ VALID */
  class Foo {
    ...
  }
  ```
- ***(>= v0.7.0)***
  ```ts
  /* ❌ INVALID */
  class Foo extends Bar {
    constructor() {
      super();
    }
    ...
  }

  /* ✔️ VALID */
  class Foo extends Bar {
    constructor(a, b) {
      super(a, b, c);
    }
    ...
  }

  /* ✔️ VALID */
  class Foo extends Bar {
    ...
  }
  ```

## 📜 History

- **v0.4.0:** Add and rename from `hugoalh/no-empty-class-constructor`.

## 📚 References

- [ESLint rule `no-useless-constructor`](https://eslint.org/docs/latest/rules/no-useless-constructor)

[ecmascript-class-constructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor
