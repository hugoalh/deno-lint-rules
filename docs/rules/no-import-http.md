# `hugoalh/no-import-http`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid import module via protocol `http:`.

Import module via protocol `http:` is not secure.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import x from "http://example.com/x.ts";

  /* ✔️ VALID */
  import x from "https://example.com/x.ts";
  ```
