# `hugoalh/max-identifier-length`

Restrict maximum length of the identifier.

Note that identifiers from build in, module, or vendor are also affected.

## 🔧 Options

### `maximum`

`{number = 40}` Maximum length of the identifier.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const doooooooooooooooooooooooooooooooooooooogName = "Betty";

  /* ✔️ VALID */
  const dogName = "Betty";
  ```
