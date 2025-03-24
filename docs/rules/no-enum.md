# `hugoalh/no-enum`

> ✔️ Default and recommended.

Forbid use of [`enum`][typescript-enum].

[`enum` is not type safe.](https://dev.to/ivanzm123/dont-use-enums-in-typescript-they-are-very-dangerous-57bh)

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  enum Foo {
    ONE = "one",
    TWO = "two"
  }
  ```
- ```ts
  enum Roles {
    Admin,
    Writer,
    Reader
  }
  ```

## ✔️ Valid

- ```ts
  type Foo = "one" | "two";
  ```
- ```ts
  type Roles = "admin" | "writer" | "reader";
  ```

[typescript-enum]: https://www.typescriptlang.org/docs/handbook/enums.html
