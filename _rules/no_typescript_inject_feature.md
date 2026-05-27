# `hugoalh/no-typescript-inject-feature`

Forbid use of TypeScript inject feature, which involve replace TypeScript syntax to JavaScript syntax when compile, execute, or transform.

These TypeScript inject features are detect:

- [`enum`][typescript-enum]
- [`namespace`][typescript-namespace] (and legacy [`module`][typescript-module]) with runtime code
  ```ts
  /* 🟢 PASS */
  namespace TypeOnly {
    export type A = string;
  }

  /* 🟡 DETECT */
  namespace A {
    export let x = 1
  }
  ```
- [Class constructor parameter property][typescript-class-constructor-parameter-property]

## 🔧 Options

This does not have any option.

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
- ```ts
  /* ❌ INVALID */
  class Params {
    constructor(
      public readonly x: number,
      protected y: number,
      private z: number
    ) {
      // ...
    }
  }

  /* ✔️ VALID */
  class Params {
    public readonly x: number;
    protected y: number;
    private z: number;
    constructor(
      x: number,
      y: number,
      z: number
    ) {
      this.x = x;
      this.y = y;
      this.z = z;
      // ...
    }
  }
  ```

## 📚 Resources

- [NodeJS TypeScript features](https://nodejs.org/docs/latest/api/typescript.html#typescript-features)

[typescript-class-constructor-parameter-property]: https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
[typescript-enum]: https://www.typescriptlang.org/docs/handbook/enums.html
[typescript-module]: https://www.typescriptlang.org/docs/handbook/modules/introduction.html
[typescript-namespace]: https://www.typescriptlang.org/docs/handbook/namespaces.html
