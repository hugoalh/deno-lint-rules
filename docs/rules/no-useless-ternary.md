# `hugoalh/no-useless-ternary`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid useless [ternary expression][ecmascript-operator-ternary].

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  const isYes = (answer === 1) ? true : false;
  ```
- ```ts
  const isNo = (answer === 1) ? false : true;
  ```
- ```ts
  const a = (x === 2) ? true : false;
  ```
- ```ts
  const b = x ? true : false;
  ```
- ```ts
  const b = x ? 10 : 10;
  ```

## ✔️ Valid

- ```ts
  const isYes = answer === 1;
  ```
- ```ts
  const isNo = answer !== 1;
  ```
- ```ts
  const a = x === 2;
  ```
- ```ts
  const b = Boolean(x);
  ```
- ```ts
  const b = 10;
  ```

## 📚 References

- [ESLint rule `no-unneeded-ternary`](https://eslint.org/docs/latest/rules/no-unneeded-ternary)

[ecmascript-operator-ternary]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
