# `hugoalh/no-depend-type-bytes`

Forbid depend file or script with bytes type.

This is aimed for whose have [Baseline][ecmascript-baseline] requirement. Visit [`import` attributes][ecmascript-import-with] for more information.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import bytes from "./hello.txt" with { type: "bytes" };
  import imageBytes from "./image.png" with { type: "bytes" };
  ```

[ecmascript-baseline]: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility
[ecmascript-import-with]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with
