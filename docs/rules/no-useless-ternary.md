# `hugoalh/no-useless-ternary`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid useless [ternary expression][ecmascript-operator-ternary].

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const isYes = (answer === 1) ? true : false;

  /* ✔️ VALID */
  const isYes = answer === 1;
  ```
- ```ts
  /* ❌ INVALID */
  const isNo = (answer === 1) ? false : true;

  /* ✔️ VALID */
  const isNo = answer !== 1;
  ```
- ```ts
  /* ❌ INVALID */
  const a = (x === 2) ? true : false;

  /* ✔️ VALID */
  const a = x === 2;
  ```
- ```ts
  /* ❌ INVALID */
  const b = x ? true : false;

  /* ✔️ VALID */
  const b = Boolean(x);
  ```
- ```ts
  /* ❌ INVALID */
  const b = x ? 10 : 10;

  /* ✔️ VALID */
  const b = 10;
  ```

## 📚 References

- [ESLint rule `no-unneeded-ternary`](https://eslint.org/docs/latest/rules/no-unneeded-ternary)

[ecmascript-operator-ternary]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
