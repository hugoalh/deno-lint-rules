# `hugoalh/prefer-statement-block`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Prefer the body of the statement is in block (i.e.: surrounded by curly braces):

- [`do-while`][ecmascript-do-while]
- [`for`][ecmascript-for]
- [`for-in`][ecmascript-for-in]
- [`for-of`][ecmascript-for-of]
- [`if`][ecmascript-if] / [`if-else`][ecmascript-if]
- [`while`][ecmascript-while]
- [`with`][ecmascript-with]

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

[ecmascript-do-while]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/do...while
[ecmascript-for]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
[ecmascript-for-in]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in
[ecmascript-for-of]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
[ecmascript-if]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
[ecmascript-while]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while
[ecmascript-with]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with
