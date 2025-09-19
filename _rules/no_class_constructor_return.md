# `hugoalh/no-class-constructor-return`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid [return][ecmascript-return] value in the [class constructor][ecmascript-class-constructor].

[Return][ecmascript-return] value in the [class constructor][ecmascript-class-constructor] is possibly mistake. Note that [return][ecmascript-return] nothing or `this` is permit.

## 🔧 Options

*This rule does not have any option.*

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

## 📜 History

- **v0.7.0:** Add.

## 📚 References

- [ESLint rule `no-constructor-return`](https://eslint.org/docs/latest/rules/no-constructor-return)

[ecmascript-class-constructor]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/constructor
[ecmascript-return]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return
