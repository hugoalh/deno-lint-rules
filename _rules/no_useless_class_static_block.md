# `hugoalh/no-useless-class-static-block`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid useless [class static (initialization) block][ecmascript-class-static-block].

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  class Foo {
    static {
    }
  }

  /* ✔️ VALID */
  class Foo {
    static {
      doSomething();
    }
  }
  ```

## 📜 History

- **v0.4.0:** Add.

## 📚 References

- [ESLint rule `no-empty-static-block`](https://eslint.org/docs/latest/rules/no-empty-static-block)

[ecmascript-class-static-block]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks
