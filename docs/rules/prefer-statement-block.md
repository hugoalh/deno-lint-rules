# `hugoalh/prefer-statement-block`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Prefer curly braces around statement blocks.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  if (foo) foo++;

  /* ✔️ VALID */
  if (foo) {
    foo++;
  }
  ```
- ```ts
  /* ❌ INVALID */
  if (foo) {
    baz();
  } else qux();

  /* ✔️ VALID */
  if (foo) {
    baz();
  } else {
    qux();
  }
  ```
- ```ts
  /* ❌ INVALID */
  while (bar)
    baz();

  /* ✔️ VALID */
  while (bar) {
    baz();
  }
  ```

## 📚 References

- [ESLint rule `curly`](https://eslint.org/docs/latest/rules/curly)
