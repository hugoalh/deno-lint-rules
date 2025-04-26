# `hugoalh/no-import-dynamic`

Forbid import module dynamically.

This is designed for the projects which use bundler, as import modules dynamically maybe cause bundler unable to bundle all of the needed modules.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const x = await import("https://example.com/x.ts");

  /* ✔️ VALID */
  import x from "https://example.com/x.ts";
  ```

## 📜 History

- **v0.5.0:** Add.
