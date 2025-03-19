# `hugoalh/no-ternary-nest`

Forbid nested [ternary expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator).

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  const thing = foo ? bar : ((baz === qux) ? quxx : foobar);
  ```
- ```ts
  foo ? ((baz === qux) ? quxx() : foobar()) : bar();
  ```

## ✔️ Valid

- ```ts
  const thing = foo ? bar : foobar;
  ```

## 📚 Resources

- [ESLint rule `no-nested-ternary`](https://eslint.org/docs/latest/rules/no-nested-ternary)
