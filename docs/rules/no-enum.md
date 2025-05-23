# `hugoalh/no-enum`

> ✔️ In the recommended rule set.

Forbid use of [`enum`][typescript-enum].

[`enum` is not type safe.](https://dev.to/ivanzm123/dont-use-enums-in-typescript-they-are-very-dangerous-57bh)

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  enum Foo {
    ONE = "one",
    TWO = "two"
  }

  /* ✔️ VALID */
  type Foo = "one" | "two";
  ```
- ```ts
  /* ❌ INVALID */
  enum Roles {
    Admin,
    Writer,
    Reader
  }

  /* ✔️ VALID */
  type Roles = "admin" | "writer" | "reader";
  ```

## 📜 History

- *History before v0.4.0 is not displayed.*

[typescript-enum]: https://www.typescriptlang.org/docs/handbook/enums.html
