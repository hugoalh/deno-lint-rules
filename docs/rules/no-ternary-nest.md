# `hugoalh/no-ternary-nest`

Forbid nested [ternary expression][ecmascript-ternary].

## 🔧 Options

*This rule does not have any option.*

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

## 📜 History

- *History before v0.4.0 is not displayed.*

## 📚 Resources

- [ESLint rule `no-nested-ternary`](https://eslint.org/docs/latest/rules/no-nested-ternary)

[ecmascript-ternary]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
