# `hugoalh/no-namespace-implementation`

Forbid implementation (i.e.: runtime code) in the [`namespace`][typescript-namespace] (and legacy [`module`][typescript-module]) declaration.

[`namespace`][typescript-namespace] (/[`module`][typescript-module]) with implementation is not an erasable TypeScript syntax for JavaScript:

- Require transformation.
- Unable to type strip.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  namespace A {
    export let x = 1
  }
  ```
- ```ts
  /* ✔️ VALID */
  namespace TypeOnly {
    export type A = string;
  }
  ```

[typescript-module]: https://www.typescriptlang.org/docs/handbook/modules/introduction.html
[typescript-namespace]: https://www.typescriptlang.org/docs/handbook/namespaces.html
