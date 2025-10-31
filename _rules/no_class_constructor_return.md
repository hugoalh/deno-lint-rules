# `hugoalh/no-class-constructor-return`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid [`return`][ecmascript-return] statement with value in the [class constructor][ecmascript-class-constructor].

In the [class constructor][ecmascript-class-constructor], use of [`return`][ecmascript-return] statement with value is possibly mistake; Note that [`return`][ecmascript-return] statement without value or with [`this`][ecmascript-this] is permit.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  class A {
    constructor(a) {
      this.a = a;
      return a;
    }
  }

  /* ✔️ VALID */
  class A {
    constructor(a) {
      this.a = a;
      return;
    }
  }
  ```
- ```ts
  /* ❌ INVALID */
  class B {
    constructor(f) {
      if (!f) {
        return 'falsy';
      }
    }
  }

  /* ✔️ VALID */
  class B {
    constructor(f) {
      if (!f) {
        return;
      }
    }
  }
  ```

## 📚 Resources

- [ESLint rule `no-constructor-return`](https://eslint.org/docs/latest/rules/no-constructor-return)

[ecmascript-class-constructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor
[ecmascript-return]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return
[ecmascript-this]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this
