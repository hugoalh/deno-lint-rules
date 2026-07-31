# `hugoalh/no-sequence-assignment`

> 🩹 Fixer is available.

Forbid sequence assignments and variables declaration.

Note that sequence assignments and variables declaration in the statement [`for`][ecmascript-for] is permit.

## 🔧 Options

This does not have any option.

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

## 📚 Resources

- [Deno lint rule `single-var-declarator`](https://docs.deno.com/lint/rules/single-var-declarator)

[ecmascript-for]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
