# `hugoalh/no-duplicate-awaits`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid duplicate [`await`][ecmascript-await] operators.

Multiple [`await`][ecmascript-await] operators have the same effect as single [`await`][ecmascript-await] operator, possibly not intended.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  await await doSomething();
  ```
- ```ts
  await await await await await await await await await await doSomething();
  ```

## ✔️ Valid

- ```ts
  await doSomething();
  ```
- ```ts
  await (await doSomething()).doAnotherSomething();
  ```

[ecmascript-await]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await
