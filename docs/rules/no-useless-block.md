# `hugoalh/no-useless-block`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

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
