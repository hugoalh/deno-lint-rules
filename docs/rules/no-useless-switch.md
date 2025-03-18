# `hugoalh/no-useless-switch`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid useless [`switch`][es-switch] statement.

Statement [`switch`][es-switch] with 1 case is pointless, and replaceable by the statement [`if`][es-if].

Statement [`switch`][es-switch] with 1 case and 1 default case is pointless, and replaceable by the statement [`if-else`][es-if].

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  switch (Deno.build.os) {
  }
  ```
- ```ts
  switch (Deno.build.os) {
    case "windows":
      doSomething();
      break;
  }
  ```
- ```ts
  switch (Deno.build.os) {
    case "windows":
      doSomething();
      break;
    default:
      doAnotherSomething();
      break;
  }
  ```

## ✔️ Valid

- ```ts
  if (Deno.build.os === "windows") {
    doSomething();
  }
  ```
- ```ts
  switch (Deno.build.os) {
    case "darwin":
      doSomething();
      break;
    case "windows":
      doAnotherSomething();
      break;
  }
  ```

[es-if]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
[es-switch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
