# `hugoalh/deno-lint-ignore-line-reason`

> ✔️ Recommended; Enable by default.

Require the [Deno lint ignore line directive][deno-directive-lint-ignore] have a reason.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  //deno-lint-ignore no-explicit-any
  function foo(): any {
    // ...
  }

  /* ✔️ VALID */
  //deno-lint-ignore no-explicit-any -- It is fine.
  function foo(): any {
    // ...
  }
  ```

[deno-directive-lint-ignore]: https://docs.deno.com/runtime/reference/cli/lint/#ignore-directives
