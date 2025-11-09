# `hugoalh/fmt-numeric-exponent-sign`

> 🩹 Fixer is available.

Require normalize the sign of the numeric exponent.

## 🔧 Options

### `signForPositive`

`{boolean = false}` Whether to require positive exponent with plus (`+`) sign.

```ts
---
signForPositive: false
---
1e4;
1e-4;
```
```ts
---
signForPositive: true
---
1e+4;
1e-4;
```

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = 1e+4;

  /* ✔️ VALID */
  const foo = 1e4;
  ```
- ```ts
  /* ✔️ VALID */
  const foo = 1e-4;
  ```
