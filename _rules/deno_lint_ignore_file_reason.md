# `hugoalh/deno-lint-ignore-file-reason`

> ✔️ Recommended; Enable by default.

Require the [Deno lint ignore file directive][deno-directive-lint-ignore] have a reason.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  //deno-lint-ignore-file no-explicit-any
  function foo(): any {
    // ...
  }

  /* ✔️ VALID */
  //deno-lint-ignore-file no-explicit-any -- It is fine.
  function foo(): any {
    // ...
  }
  ```

[deno-directive-lint-ignore]: https://docs.deno.com/runtime/reference/cli/lint/#ignore-directives
