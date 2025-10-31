# `hugoalh/deno-fmt-ignore-file-reason`

Require the [Deno format ignore file directive][deno-directive-fmt-ignore] have a reason.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  //deno-fmt-ignore-file
  if (foo) {
  }

  /* ✔️ VALID */
  //deno-fmt-ignore-file It is fine.
  if (foo) {
  }
  ```

[deno-directive-fmt-ignore]: https://docs.deno.com/runtime/reference/cli/fmt/#ignoring-code
