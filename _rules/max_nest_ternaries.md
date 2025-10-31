# `hugoalh/max-nest-ternaries`

Restrict maximum nest of the [ternary expression][ecmascript-ternary]s.

## 🔧 Options

### `maximum`

`{number = 0}` Maximum nest of the ternary expressions.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const thing = foo ? bar : ((baz === qux) ? quxx : foobar);
  ```
- ```ts
  /* ❌ INVALID */
  foo ? ((baz === qux) ? quxx() : foobar()) : bar();
  ```
- ```ts
  /* ✔️ VALID */
  const thing = foo ? bar : foobar;
  ```

## 📚 Resources

- [ESLint rule `no-nested-ternary`](https://eslint.org/docs/latest/rules/no-nested-ternary)

[ecmascript-ternary]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
