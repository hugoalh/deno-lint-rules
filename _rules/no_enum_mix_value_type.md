# `hugoalh/no-enum-mix-value-type`

> ✔️ Recommended; Enable by default.

Forbid use of [`enum`][typescript-enum] with mix value type.

[`enum`][typescript-enum] allow to assign `number` or `string` value to it's members. Most [`enum`][typescript-enum]s contain either all `number`s or all `string`s, but in theory [`enum`][typescript-enum] can mix and match within the same enum. Mix [`enum`][typescript-enum] members value type is generally considered confusing and a bad practice.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  enum Status {
    Unknown,
    Closed = 1,
    Open = 'open',
  }

  /* ✔️ VALID */
  enum Status {
    Unknown = 0,
    Closed = 1,
    Open = 2,
  }

  /* ✔️ VALID */
  enum Status {
    Unknown,
    Closed,
    Open,
  }

  /* ✔️ VALID */
  enum Status {
    Unknown = 'unknown',
    Closed = 'closed',
    Open = 'open',
  }
  ```

## 📚 Resources

- [TypeScript ESLint rule `no-mixed-enums`](https://typescript-eslint.io/rules/no-mixed-enums)

[typescript-enum]: https://www.typescriptlang.org/docs/handbook/enums.html
