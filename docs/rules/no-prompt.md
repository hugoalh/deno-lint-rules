# `hugoalh/no-prompt`

Forbid use of [`prompt`](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt).

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  prompt();
  ```
- ```ts
  globalThis.prompt();
  ```
- ```ts
  globalThis["prompt"]();
  ```
- ```ts
  window.prompt();
  ```
- ```ts
  window["prompt"]();
  ```
- ```ts
  globalThis.window.prompt();
  ```
- ```ts
  globalThis.window["prompt"]();
  ```
- ```ts
  globalThis["window"].prompt();
  ```
- ```ts
  globalThis["window"]["prompt"]();
  ```

## ✔️ Valid

- ```ts
  customPrompt();
  ```
