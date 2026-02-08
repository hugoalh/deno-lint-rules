# `hugoalh/no-import-source`

Forbid import file, module, or script as source.

This is aimed for whose have [Baseline][ecmascript-baseline] requirement. Visit [`import`][ecmascript-import] for more information.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import source addModule from "./add.wasm";
  const addInstance = WebAssembly.instantiate(addModule);
  const add = addInstance.exports.add;
  console.log(add(1, 2));
  ```

[ecmascript-baseline]: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility
[ecmascript-import]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
