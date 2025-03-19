# `hugoalh/prefer-statement-block`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Prefer curly braces around statement blocks.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  if (foo) foo++;
  ```
- ```ts
  if (foo) {
    baz();
  } else qux();
  ```
- ```ts
  while (bar)
    baz();
  ```

## ✔️ Valid

- ```ts
  if (foo) {
    foo++;
  }
  ```
- ```ts
  if (foo) {
    baz();
  } else {
    qux();
  }
  ```
- ```ts
  while (bar) {
    baz();
  }
  ```

## 📚 References

- [ESLint rule `curly`](https://eslint.org/docs/latest/rules/curly)
