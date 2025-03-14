# `hugoalh/no-alert`

Forbid use of [`alert`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert).

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
  customAlert();
  ```

## 📚 Resources

- [ESLint rule `no-alert`](https://eslint.org/docs/latest/rules/no-alert)
