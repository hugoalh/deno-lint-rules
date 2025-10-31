# `hugoalh/no-depend-type-wasm`

Forbid depend WASM (WebAssembly) module.

This rule is aimed for whose have [Baseline][ecmascript-baseline] requirement. Visit [`import` attributes][ecmascript-import-with] for more information.

> [!NOTE]
> - Due to the Deno linter plugin API limitation, detect dependencies from imports map is not possible.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import helper from "./helper.wasm";
  ```

[ecmascript-baseline]: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility
[ecmascript-import-with]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import/with
