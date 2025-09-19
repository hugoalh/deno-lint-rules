# `hugoalh/no-misuse-for`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid misuse [`for`][ecmascript-for] statement.

Statement [`for`][ecmascript-for] without initializer statement and update statement, possibly replaceable by the statement [`while`][ecmascript-while].

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = [1, 2, 3];
  let index = 0;
  for (; index < foo.length; ) {
    console.log(foo[index]);
    index += 1
  }

  /* ✔️ VALID */
  const foo = [1, 2, 3];
  let index = 0;
  while (index < foo.length) {
    console.log(foo[index]);
    index += 1
  }
  ```

[ecmascript-for]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
[ecmascript-while]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while
