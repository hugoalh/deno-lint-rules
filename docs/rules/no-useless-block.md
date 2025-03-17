# `hugoalh/no-useless-block`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid useless block.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  function foo(a) {
    {
      doSomething(a);
    }
  }
  ```

## ✔️ Valid

- ```ts
  function foo(a) {
    doSomething(a);
  }
  ```
- ```ts
  function foo(a) {
	doSomething(a);
    {
      doAnotherSomething(a);
    }
  }
  ```
- ```ts
  const c = 1;
  {
    const c = 2;
  }
  console.log(c);
  //=> 1
  ```
