# `hugoalh/no-depend-type-text`

Forbid depend file or script with text type.

This rule is aimed for whose have [Baseline][ecmascript-baseline] requirement. Visit [`import` attributes][ecmascript-import-with] for more information.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import message from "./hello.txt" with { type: "text" };
  ```

[ecmascript-baseline]: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility
[ecmascript-import-with]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with
