# `hugoalh/no-misuse-switch`

> ✔️ Recommended; Enable by default.

Forbid misuse [`switch`][ecmascript-switch] statement.

Statement [`switch`][ecmascript-switch] with only 1 case, possibly replaceable by the statement [`if`][ecmascript-if].

Statement [`switch`][ecmascript-switch] with only 1 case and the default case, possibly replaceable by the statement [`if-else`][ecmascript-if].

## 🔧 Options

*This rule does not have any option.*

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

[ecmascript-if]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
[ecmascript-switch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
