# `hugoalh/no-import-defer`

Forbid import file, module, or script with defer.

This is aimed for whose have [Baseline][ecmascript-baseline] requirement. Visit [`import`][ecmascript-import] for more information.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import defer * as addModule from "./add.wasm";
  ```
- ```ts
  /* ❌ INVALID */
  const addModule = await import.defer("./add.wasm");
  ```

[ecmascript-baseline]: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility
[ecmascript-import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
