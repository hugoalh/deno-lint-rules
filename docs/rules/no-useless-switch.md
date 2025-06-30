# `hugoalh/no-useless-switch`

> [!NOTE]
> - Since v0.9.0, some parts are separated to other rules:
>   - [`no-empty`][rule-no-empty] for empty [`switch`][ecmascript-switch] statement.
>   - [`hugoalh/no-misuse-switch`][rule-hugoalh-no-misuse-switch] for misuse [`switch`][ecmascript-switch] statement.

> ✔️ In the recommended rule set.

> 🩹 Fixer is available.

Forbid useless [`switch`][ecmascript-switch] statement.

***(< v0.9.0)*** Statement [`switch`][ecmascript-switch] with only 1 case, possibly replaceable by the statement [`if`][ecmascript-if].

***(< v0.9.0)*** Statement [`switch`][ecmascript-switch] with only 1 case and the default case, possibly replaceable by the statement [`if-else`][ecmascript-if].

***(\>= v0.6.0)*** [`switch`][ecmascript-switch] case which also covered by the default case is possibly removable.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ***(< v0.9.0)*** Empty
  ```ts
  /* ❌ INVALID */
  switch (Deno.build.os) {
  }
  ```
- ***(\>= v0.9.0)*** Empty
  ```ts
  /* ❌ INVALID */
  switch (Deno.build.os) {
    case "darwin":
    case "windows":
  }
  ```
- ***(< v0.9.0)*** 1 case
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
- ***(< v0.9.0)*** 1 case and default case
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
- ***(\>= v0.6.0)*** Case also covered by the default case
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

- **v0.9.0:** Some parts are separate to other rules:
  - [`no-empty`][rule-no-empty] for empty [`switch`][ecmascript-switch] statement.
  - [`hugoalh/no-misuse-switch`][rule-hugoalh-no-misuse-switch] for misuse [`switch`][ecmascript-switch] statement.
- **v0.6.0:** Also detect useless [`switch`][ecmascript-switch] case.
- **v0.4.0:** Add.

[ecmascript-if]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
[ecmascript-switch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
[rule-no-empty]: https://docs.deno.com/lint/rules/no-empty/
[rule-hugoalh-no-misuse-switch]: https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-misuse-switch.md
