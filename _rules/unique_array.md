# `hugoalh/unique-array`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Require the literal array have unique elements when explicitly specify before with block comment.

```ts
/* UNIQUE */[1, 2, 3];
/* Unique */[4, 5, 6];
/* unique */[7, 8, 9];
```

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = /* Unique */[1, 2, 3, 1];

  /* ✔️ VALID */
  const foo = /* Unique */[1, 2, 3];

  /* ✔️ VALID */
  const foo = [1, 2, 3, 1];
  ```
