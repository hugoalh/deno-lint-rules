# `hugoalh/no-alert`

Forbid use of [`alert`][ecmascript-alert].

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  alert();
  ```
- ```ts
  globalThis.alert();
  ```
- ```ts
  globalThis["alert"]();
  ```
- ```ts
  window.alert();
  ```
- ```ts
  window["alert"]();
  ```
- ```ts
  globalThis.window.alert();
  ```
- ```ts
  globalThis.window["alert"]();
  ```
- ```ts
  globalThis["window"].alert();
  ```
- ```ts
  globalThis["window"]["alert"]();
  ```

## ✔️ Valid

- ```ts
  foo.alert();
  ```

## 📚 Resources

- [ESLint rule `no-alert`](https://eslint.org/docs/latest/rules/no-alert)

[ecmascript-alert]: https://developer.mozilla.org/en-US/docs/Web/API/Window/alert
