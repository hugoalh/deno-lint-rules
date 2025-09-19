# `hugoalh/no-nan`

> ✔️ Recommended; Enable by default.

Forbid use of [`NaN`][ecmascript-nan].

Use of [`NaN`][ecmascript-nan] is possibly not intended.

## 🔧 Options

*This rule does not have any option.*

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

## 📜 History

- *History before v0.4.0 is not displayed.*

[ecmascript-nan]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN
