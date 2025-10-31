# `hugoalh/deno-coverage-ignore-file-reason`

Require the [Deno coverage ignore file directive][deno-directive-coverage-ignore] have a reason.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  //deno-coverage-ignore-file
  if (foo) {
  }

  /* ✔️ VALID */
  //deno-coverage-ignore-file It is fine.
  if (foo) {
  }
  ```

[deno-directive-coverage-ignore]: https://docs.deno.com/runtime/reference/cli/coverage/#ignoring-code
