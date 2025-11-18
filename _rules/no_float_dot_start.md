# `hugoalh/fmt-float`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid float without integer but with start dot (`.`).

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = .5;

  /* ✔️ VALID */
  const foo = 0.5;
  ```

## 📚 Resources

- [ESLint rule `no-floating-decimal`](https://eslint.org/docs/latest/rules/no-floating-decimal)
