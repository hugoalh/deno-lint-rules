# `hugoalh/no-import-http`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid import module via protocol `http:`.

Import module via protocol `http:` is not secure.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  import x from "http://example.com/x.ts";
  ```

## ✔️ Valid

- ```ts
  import x from "https://example.com/x.ts";
  ```
