# `hugoalh/max-params`

Restrict maximum number of parameters per function/method definition.

Function/Method that take numerous parameters can be difficult to read and write because it requires the memorization of what each parameter is, its type, and the order they should appear in. As a result, many coders adhere to a convention that caps the number of parameters per function/method can take.

## 🔧 Options

### `maximum`

`{number = 4}` Maximum number of parameters per function/method definition.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  function foo (a, b, c, d, e) {
    doSomething();
  }

  /* ✔️ VALID */
  function foo (a, b, c, d) {
    doSomething();
  }
  ```
- ```ts
  /* ❌ INVALID */
  const foo = (a, b, c, d, e) => {
    doSomething();
  };

  /* ✔️ VALID */
  const foo = (a, b, c, d) => {
    doSomething();
  };
  ```
- ```ts
  /* ❌ INVALID */
  class Foo {
    constructor(a, b, c, d, e) {
      doSomething();
    }
  }

  /* ✔️ VALID */
  class Foo {
    constructor(a, b, c, d) {
      doSomething();
    }
  }
  ```

- ```ts
  ---
  maximum: 3
  ---
  /* ❌ INVALID */
  function foo (a, b, c, d) {
    doSomething();
  }
  ```
- ```ts
  ---
  maximum: 3
  ---
  /* ❌ INVALID */
  const foo = (a, b, c, d) => {
    doSomething();
  };
  ```

## 📚 Resources

- [ESLint rule `max-params`](https://eslint.org/docs/latest/rules/max-params)
- [TypeScript ESLint rule `max-params`](https://typescript-eslint.io/rules/max-params)
