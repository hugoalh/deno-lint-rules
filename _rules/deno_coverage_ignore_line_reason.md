# `hugoalh/deno-coverage-ignore-line-reason`

Require the [Deno coverage ignore line directive][deno-directive-coverage-ignore] have a reason.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  //deno-coverage-ignore
  if (foo) {
  }

  /* ✔️ VALID */
  //deno-coverage-ignore It is fine.
  if (foo) {
  }
  ```

[deno-directive-coverage-ignore]: https://docs.deno.com/runtime/reference/cli/coverage/#ignoring-code
