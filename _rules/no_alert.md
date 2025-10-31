# `hugoalh/no-alert`

Forbid use of [`alert`][ecmascript-alert].

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  alert();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis.alert();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis["alert"]();
  ```
- ```ts
  /* ❌ INVALID */
  window.alert();
  ```
- ```ts
  /* ❌ INVALID */
  window["alert"]();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis.window.alert();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis.window["alert"]();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis["window"].alert();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis["window"]["alert"]();
  ```
- ```ts
  /* ✔️ VALID */
  foo.alert();
  ```

## 📚 Resources

- [ESLint rule `no-alert`](https://eslint.org/docs/latest/rules/no-alert)

[ecmascript-alert]: https://developer.mozilla.org/en-US/docs/Web/API/Window/alert
