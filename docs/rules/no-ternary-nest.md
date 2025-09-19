# `hugoalh/no-ternary-nest`

> [!CAUTION]
> - This rule is replaced by rule [`hugoalh/max-nest-ternary`][rule-hugoalh-max-nest-ternary] since v0.9.0.

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

- **v0.9.0:** Replace by rule [`hugoalh/max-nest-ternary`][rule-hugoalh-max-nest-ternary].
- *History before v0.4.0 is not displayed.*

## 📚 Resources

- [ESLint rule `no-nested-ternary`](https://eslint.org/docs/latest/rules/no-nested-ternary)

[ecmascript-ternary]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
[rule-hugoalh-max-nest-ternary]: https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/max-nest-ternary.md
