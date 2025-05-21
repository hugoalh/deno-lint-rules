# `hugoalh/no-modifier-public`

> ✔️ In the recommended rule set.

Forbid modifier [`public`][typescript-public].

Use of modifier [`public`][typescript-public] is useless as public is the default visibility.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  class Foo {
    public value: string;
    public constructor() {
      this.value = "bar";
    }
  }

  /* ✔️ VALID */
  class Foo {
    value: string;
    constructor() {
      this.value = "bar";
    }
  }
  ```

## 📜 History

- **v0.8.0:** Add.

[typescript-public]: https://www.typescriptlang.org/docs/handbook/2/classes.html#public
