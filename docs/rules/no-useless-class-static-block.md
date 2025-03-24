# `hugoalh/no-useless-class-static-block`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid useless [class static (initialization) block][ecmascript-class-static-block].

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  class Foo {
    static {
    }
  }
  ```

## ✔️ Valid

- ```ts
  class Foo {
    static {
      doSomething();
    }
  }
  ```

## 📚 References

- [ESLint rule `no-empty-static-block`](https://eslint.org/docs/latest/rules/no-empty-static-block)

[ecmascript-class-static-block]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks
