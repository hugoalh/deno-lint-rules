# `hugoalh/no-modifier-private`

> ✔️ Recommended; Enable by default.

Forbid use of modifier [`private`][typescript-private].

Use of modifier [`private`][typescript-private] will not actually make it private, use [`#`][ecmascript-private] instead.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  class Foo {
    private value: string;
    private constructor() {
      this.value = "bar";
    }
  }

  /* ✔️ VALID */
  class Foo {
    #value: string;
    private constructor() {
      this.#value = "bar";
    }
  }
  ```

## 📜 History

- **v0.8.0:** Add.

[ecmascript-private]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties
[typescript-private]: https://www.typescriptlang.org/docs/handbook/2/classes.html#private
