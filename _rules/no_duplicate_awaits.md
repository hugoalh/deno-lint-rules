# `hugoalh/no-duplicate-awaits`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid duplicate [`await`][ecmascript-await]s.

Multiple [`await`][ecmascript-await]s have the same effect as single [`await`][ecmascript-await], possibly not intended.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  await await doSomething();

  /* ✔️ VALID */
  await doSomething();
  ```
- ```ts
  /* ❌ INVALID */
  await await await await await await await await await await doSomething();

  /* ✔️ VALID */
  await doSomething();
  ```
- ```ts
  /* ✔️ VALID */
  await (await doSomething()).doAnotherSomething();
  ```

[ecmascript-await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
