# `hugoalh/prefer-variable-declaration-ungroup-form`

> 🩹 Fixer is available.

Prefer declare variable in ungroup form.

Group variable declaration in the initialize of the statement [`for`][ecmascript-for] is always permit.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const a = 1, b = 2, c = 3;

  /* ✔️ VALID */
  const a = 1;
  const b = 2;
  const c = 3;
  ```

## 📜 History

- **v0.9.0:** Add.

[ecmascript-for]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
