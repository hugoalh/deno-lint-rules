# `hugoalh/no-duplicate-spreads`

> ✔️ Recommended; Enable by default.

Forbid duplicate spread elements in the object.

Multiple same spread elements in the object is possibly not intended.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const a = {
    x: 1,
    y: 2
  }
  const foo = {
    ...a,
    x: 2,
    ...a
  }

  /* ✔️ VALID */
  const a = {
    x: 1,
    y: 2
  }
  const foo = {
    ...a,
    x: 2
  }
  ```
