# `hugoalh/no-confirm`

Forbid use of [`confirm`][ecmascript-confirm].

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  confirm();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis.confirm();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis["confirm"]();
  ```
- ```ts
  /* ❌ INVALID */
  window.confirm();
  ```
- ```ts
  /* ❌ INVALID */
  window["confirm"]();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis.window.confirm();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis.window["confirm"]();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis["window"].confirm();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis["window"]["confirm"]();
  ```
- ```ts
  /* ✔️ VALID */
  foo.confirm();
  ```

## 📚 Resources

- [ESLint rule `no-alert`](https://eslint.org/docs/latest/rules/no-alert)

[ecmascript-confirm]: https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
