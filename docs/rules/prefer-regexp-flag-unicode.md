# `hugoalh/prefer-regexp-flag-unicode`

Prefer the [regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) is contain Unicode flag (`u` or `v`).

## 🔧 Options

### `flag`

`{DenoLintRulePreferRegExpFlagUnicodeType = "u"}` Select which regular expression Unicode flag should use.

## ❌ Invalid

- ```ts
  const foo = /aaa/;
  ```
- ```ts
  const foo = /bbb/gi;
  ```

## ✔️ Valid

- ```ts
  const foo = /aaa/u;
  ```
- ```ts
  const foo = /bbb/giu;
  ```

## 📚 Resources

- [ESLint rule `require-unicode-regexp`](https://eslint.org/docs/latest/rules/require-unicode-regexp)
