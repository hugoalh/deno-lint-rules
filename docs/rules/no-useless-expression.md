# `hugoalh/no-useless-expression`

> ✔️ Default and recommended.

Forbid useless expression which will do nothing, likely missing the assignment or call.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  doSomething;
  ```
- ```ts
  "Hello, world!";
  ```

## ✔️ Valid

- ```ts
  doSomething();
  ```
- ```ts
  const foo = "Hello, world!";
  ```

## 📚 References

- [ESLint rule `no-unused-expressions`](https://eslint.org/docs/latest/rules/no-unused-expressions)
