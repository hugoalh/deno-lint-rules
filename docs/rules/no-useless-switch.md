# `hugoalh/no-useless-switch`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid useless [`switch`][ecmascript-switch] statement.

Statement [`switch`][ecmascript-switch] with 1 case is pointless, and replaceable by the statement [`if`][ecmascript-if].

Statement [`switch`][ecmascript-switch] with 1 case and default case is pointless, and replaceable by the statement [`if-else`][ecmascript-if].

***(\>= v0.6.0)*** [`switch`][ecmascript-switch] cases group with any case and default case is pointless as covered by the default case.

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
- ***(\>= v0.6.0)***
  ```ts
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
- ***(\>= v0.6.0)***
  ```ts
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
  ```
- ***(\>= v0.6.0)***
  ```ts
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

[ecmascript-if]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
[ecmascript-switch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
