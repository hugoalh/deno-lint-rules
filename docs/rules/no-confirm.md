# `hugoalh/no-confirm`

Forbid use of [`confirm`][ecmascript-confirm].

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  confirm();
  ```
- ```ts
  globalThis.confirm();
  ```
- ```ts
  globalThis["confirm"]();
  ```
- ```ts
  window.confirm();
  ```
- ```ts
  window["confirm"]();
  ```
- ```ts
  globalThis.window.confirm();
  ```
- ```ts
  globalThis.window["confirm"]();
  ```
- ```ts
  globalThis["window"].confirm();
  ```
- ```ts
  globalThis["window"]["confirm"]();
  ```

## ✔️ Valid

- ```ts
  foo.confirm();
  ```

## 📚 Resources

- [ESLint rule `no-alert`](https://eslint.org/docs/latest/rules/no-alert)

[ecmascript-confirm]: https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm
