# `hugoalh/no-useless-block`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid useless block and nest block.

## 🔧 Options

This does not have any option.

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
