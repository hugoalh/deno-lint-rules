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
- Parameter properties
  - [`private`][typescript-private]
  - [`protected`][typescript-protected]
  - [`public`][typescript-public]

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
  class Foo {
    private value: string;
    private constructor() {
      this.value = "bar";
    }
  }

  /* ✔️ VALID */
  class Foo {
    #value: string;
    constructor() {
      this.#value = "bar";
    }
  }
  ```
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

## 📚 Resources

- [NodeJS TypeScript features](https://nodejs.org/docs/latest/api/typescript.html#typescript-features)

[typescript-enum]: https://www.typescriptlang.org/docs/handbook/enums.html
[typescript-module]: https://www.typescriptlang.org/docs/handbook/modules/introduction.html
[typescript-namespace]: https://www.typescriptlang.org/docs/handbook/namespaces.html
[typescript-private]: https://www.typescriptlang.org/docs/handbook/2/classes.html#private
[typescript-protected]: https://www.typescriptlang.org/docs/handbook/2/classes.html#protected
[typescript-public]: https://www.typescriptlang.org/docs/handbook/2/classes.html#public
