# `hugoalh/max-nest-ternary`

Restrict maximum nest of [ternary expression][ecmascript-ternary].

## 🏷️ Tags

*This rule does not have any tag.*

## 🔧 Options

### `maximum`

`{number = 0}` Maximum nest of ternaries.

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
