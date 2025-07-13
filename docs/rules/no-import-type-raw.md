# `hugoalh/no-import-type-raw`

Forbid import raw module.

This rule is aimed for whose have [Baseline][ecmascript-baseline] requirement. Visit [`import` attributes][ecmascript-import-with] for more information.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import message from "./hello.txt" with { type: "text" };
  import bytes from "./hello.txt" with { type: "bytes" };
  import imageBytes from "./image.png" with { type: "bytes" };
  ```

## 📜 History

- **v0.10.0:** Add.

[ecmascript-baseline]: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility
[ecmascript-import-with]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with
