# `hugoalh/no-nan`

> ✔️ Default and recommended.

Forbid use of [`NaN`][ecmascript-nan].

Use of [`NaN`][ecmascript-nan] literal is possibly not intended.

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

[ecmascript-nan]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN
