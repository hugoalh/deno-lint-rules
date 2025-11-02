# `hugoalh/no-misuse-switch`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid misuse [`switch`][ecmascript-switch] statement.

[`switch`][ecmascript-switch] statement with only 1 case is possibly replaceable by the [`if`][ecmascript-if-else] statement.

[`switch`][ecmascript-switch] statement with only 1 case and the default case is possibly replaceable by the [`if-else`][ecmascript-if-else] statement.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- 1 case
  ```ts
  /* ❌ INVALID */
  switch (Deno.build.os) {
    case "windows":
      doSomething();
      break;
  }

  /* ✔️ VALID */
  if (Deno.build.os === "windows") {
    doSomething();
  }
  ```
- 1 case and default case
  ```ts
  /* ❌ INVALID */
  switch (Deno.build.os) {
    case "windows":
      doSomething();
      break;
    default:
      doAnotherSomething();
      break;
  }

  /* ✔️ VALID */
  if (Deno.build.os === "windows") {
    doSomething();
  } else {
    doAnotherSomething();
  }
  ```
- ```ts
  /* ✔️ VALID */
  switch (Deno.build.os) {
    case "darwin":
      doSomething();
      break;
    case "windows":
      doAnotherSomething();
      break;
  }
  ```

[ecmascript-if-else]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
[ecmascript-switch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
