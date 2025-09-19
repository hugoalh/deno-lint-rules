# `hugoalh/no-import-type-json`

Forbid import JSON module.

This rule is aimed for whose have [Baseline][ecmascript-baseline] requirement. Visit [`import` attributes][ecmascript-import-with] for more information.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import x from "data:application/json,{\"foo\":42}" with { type: "json" };
  ```

## 📜 History

- **v0.10.0:** Add.

[ecmascript-baseline]: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility
[ecmascript-import-with]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with
