# `hugoalh/no-useless-switch-case`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid useless [`switch`][ecmascript-switch] case.

[`switch`][ecmascript-switch] case which also covered by the default case is possibly removable.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = [1, 2];
  switch (foo.length) {
    case 0:
    case 1:
      doSomething();
      break;
    case 2:
    case 3:
    case 4:
    default:
      doAnotherSomething();
      break;
  }

  /* ✔️ VALID */
  const foo = [1, 2];
  switch (foo.length) {
    case 0:
    case 1:
      doSomething();
      break;
    default:
      doAnotherSomething();
      break;
  }

  /* ✔️ VALID */
  const foo = [1, 2];
  switch (foo.length) {
    case 0:
    case 1:
      doSomething();
      break;
    case 2:
    case 3:
    case 4:
      doMoreSomething();
    default:
      doAnotherSomething();
      break;
  }
  ```

[ecmascript-switch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
