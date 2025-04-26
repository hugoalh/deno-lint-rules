# `hugoalh/prefer-regexp-flag-unicode`

Prefer the [regular expression][ecmascript-regexp] is contain Unicode flag (`u` or `v`).

## 🔧 Options

### `flag`

`{DenoLintRulePreferRegExpFlagUnicodeType = "u"}` Select which regular expression Unicode flag should use.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = /aaa/;

  /* ✔️ VALID */
  const foo = /aaa/u;
  ```
- ```ts
  /* ❌ INVALID */
  const foo = /bbb/gi;

  /* ✔️ VALID */
  const foo = /bbb/giu;
  ```

## 📜 History

- *History before v0.4.0 is not displayed.*

## 📚 Resources

- [ESLint rule `require-unicode-regexp`](https://eslint.org/docs/latest/rules/require-unicode-regexp)

[ecmascript-regexp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
