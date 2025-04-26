# `hugoalh/no-useless-switch`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid useless [`switch`][ecmascript-switch] statement.

Statement [`switch`][ecmascript-switch] with 1 case is pointless, and replaceable by the statement [`if`][ecmascript-if].

Statement [`switch`][ecmascript-switch] with 1 case and default case is pointless, and replaceable by the statement [`if-else`][ecmascript-if].

***(\>= v0.6.0)*** [`switch`][ecmascript-switch] cases group with any case and default case is pointless as covered by the default case.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- Empty
  ```ts
  /* ❌ INVALID */
  switch (Deno.build.os) {
  }
  ```
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
- ***(\>= v0.6.0)*** Cases group with any case and default case
  ```ts
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

## 📜 History

- **v0.6.0:** Also detect useless [`switch`][ecmascript-switch] case.
- **v0.4.0:** Add.

[ecmascript-if]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
[ecmascript-switch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
