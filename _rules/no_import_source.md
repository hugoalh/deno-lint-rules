# `hugoalh/no-import-source`

Forbid import file, module, or script as source.

This is aimed for whose have [Baseline][ecmascript-baseline] requirement. Visit [`import`][ecmascript-import] for more information.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import source addModule from "./add.wasm";
  ```
- ```ts
  /* ❌ INVALID */
  const addModule = await import.source("./add.wasm");
  ```

[ecmascript-baseline]: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility
[ecmascript-import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
