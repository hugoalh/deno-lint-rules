# `hugoalh/regexp-flag-unicode`

> 🩹 Fixer is available.

Require the [regular expression][ecmascript-regexp] contain Unicode flag (`u` or `v`).

## 🔧 Options

### `flag`

`{RegExpFlagUnicodeType = "u"}` Which regular expression Unicode flag should use. Only accept these values:

- `"u"`
- `"v"`

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

## 📚 Resources

- [ESLint rule `require-unicode-regexp`](https://eslint.org/docs/latest/rules/require-unicode-regexp)

[ecmascript-regexp]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions
