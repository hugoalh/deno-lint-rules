# `hugoalh/no-nan`

> ✔️ Default and recommended.

Forbid use of [`NaN`][es-nan].

Use of [`NaN`][es-nan] literal is likely not intended.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  const a = NaN;
  ```
- ```ts
  const b = Number.NaN;
  ```
- ```ts
  const c = globalThis.NaN;
  ```
- ```ts
  const d = globalThis.Number.NaN;
  ```
- ```ts
  const b = Number["NaN"];
  ```
- ```ts
  const c = globalThis["NaN"];
  ```
- ```ts
  const d = globalThis.Number["NaN"];
  ```
- ```ts
  const d = globalThis["Number"].NaN;
  ```
- ```ts
  const d = globalThis["Number"]["NaN"];
  ```

## ✔️ Valid

- ```ts
  const a = 10;
  ```

[es-nan]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN
