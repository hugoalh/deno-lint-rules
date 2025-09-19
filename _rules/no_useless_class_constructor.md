# `hugoalh/no-useless-class-constructor`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

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

## 📚 References

- [ESLint rule `no-useless-constructor`](https://eslint.org/docs/latest/rules/no-useless-constructor)

[ecmascript-class-constructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor
