# `hugoalh/deno-coverage-ignore-start-reason`

Require the [Deno coverage ignore start directive][deno-directive-coverage-ignore] have a reason.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  //deno-coverage-ignore-start
  if (foo) {
  }
  //deno-coverage-ignore-stop

  /* ✔️ VALID */
  //deno-coverage-ignore-start It is fine.
  if (foo) {
  }
  //deno-coverage-ignore-stop
  ```

[deno-directive-coverage-ignore]: https://docs.deno.com/runtime/reference/cli/coverage/#ignoring-code
