# `hugoalh/no-nan`

> ✔️ Recommended; Enable by default.

Forbid use of [`NaN`][ecmascript-nan].

Use of [`NaN`][ecmascript-nan] literal is possibly not intended.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const a = NaN;
  ```
- ```ts
  /* ❌ INVALID */
  const b = Number.NaN;
  ```
- ```ts
  /* ❌ INVALID */
  const c = globalThis.NaN;
  ```
- ```ts
  /* ❌ INVALID */
  const d = globalThis.Number.NaN;
  ```
- ```ts
  /* ❌ INVALID */
  const b = Number["NaN"];
  ```
- ```ts
  /* ❌ INVALID */
  const c = globalThis["NaN"];
  ```
- ```ts
  /* ❌ INVALID */
  const d = globalThis.Number["NaN"];
  ```
- ```ts
  /* ❌ INVALID */
  const d = globalThis["Number"].NaN;
  ```
- ```ts
  /* ❌ INVALID */
  const d = globalThis["Number"]["NaN"];
  ```

[ecmascript-nan]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN
