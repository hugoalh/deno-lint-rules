# `hugoalh/no-duplicate-awaits`

> ✔️ In the recommended rule set.

> 🩹 Fixer is available.

Forbid duplicate [`await`][ecmascript-await] operators.

Multiple [`await`][ecmascript-await] operators have the same effect as single [`await`][ecmascript-await] operator, possibly not intended.

## 🔧 Options

*This rule does not have any option.*

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

## 📜 History

- **v0.5.0:** Add.

[ecmascript-await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
