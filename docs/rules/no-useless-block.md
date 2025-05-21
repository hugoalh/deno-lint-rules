# `hugoalh/no-useless-block`

> ✔️ In the recommended rule set.

> 🩹 Fixer is available.

Forbid useless block.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  function foo(a) {
    {
      doSomething(a);
    }
  }

  /* ✔️ VALID */
  function foo(a) {
    doSomething(a);
  }
  ```
- ```ts
  /* ❌ INVALID */
  function foo(a) {
    doSomething(a);
    {
      doAnotherSomething(a);
    }
  }

  /* ✔️ VALID */
  function foo(a) {
    doSomething(a);
    doAnotherSomething(a);
  }
  ```
- ```ts
  /* ✔️ VALID */
  const c = 1;
  {
    const c = 2;
  }
  console.log(c);
  //=> 1
  ```

## 📜 History

- **v0.6.0:** Also detect [`switch`][ecmascript-switch] case with empty block.
- **v0.4.0:** Add.

[ecmascript-switch]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
