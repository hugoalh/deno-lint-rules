# `hugoalh/no-prompt`

Forbid use of [`prompt`][ecmascript-prompt].

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  prompt();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis.prompt();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis["prompt"]();
  ```
- ```ts
  /* ❌ INVALID */
  window.prompt();
  ```
- ```ts
  /* ❌ INVALID */
  window["prompt"]();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis.window.prompt();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis.window["prompt"]();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis["window"].prompt();
  ```
- ```ts
  /* ❌ INVALID */
  globalThis["window"]["prompt"]();
  ```
- ```ts
  /* ✔️ VALID */
  foo.prompt();
  ```

## 📜 History

- *History before v0.4.0 is not displayed.*

## 📚 Resources

- [ESLint rule `no-alert`](https://eslint.org/docs/latest/rules/no-alert)

[ecmascript-prompt]: https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt
