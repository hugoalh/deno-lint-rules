# `hugoalh/no-sequence-assignment`

> 🩹 Fixer is available.

Forbid sequence assignments and variables declaration.

Sequence assignments and variables declaration in the statement [`for`][ecmascript-for] is always permit.

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
- ```ts
  /* ❌ INVALID */
  let a, b, c;
  a = 1, b = 2, c = 3;

  /* ✔️ VALID */
  let a;
  let b;
  let c;
  a = 1;
  b = 2;
  c = 3;
  ```

## 📜 History

- **v0.9.0:** Add.

[ecmascript-for]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
