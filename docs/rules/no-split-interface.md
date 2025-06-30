# `hugoalh/no-split-interface`

> ✔️ In the recommended rule set.

> 🩹 Fixer is available.

Forbid split [`interface`][typescript-interface] with same identifier.

Multiple [`interface`][typescript-interface]s with same identifier is a bad practice and cause confusion, which have the same effect as single [`interface`][typescript-interface] with same identifier, possibly mergeable.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  interface C {
    a: boolean;
    b: string;
  }
  ...
  ...
  ...
  interface C {
    c: number;
    d: bigint;
  }

  /* ✔️ VALID */
  interface C {
    a: boolean;
    b: string;
    c: number;
    d: bigint;
  }
  ```

## 📜 History

- **v0.9.0:** Separate from rule [`hugoalh/no-duplicate-interfaces`][rule-hugoalh-no-duplicate-interfaces].

[rule-hugoalh-no-duplicate-interfaces]: https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-duplicate-interfaces.md
[typescript-interface]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#interfaces
