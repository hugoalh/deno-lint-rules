# `hugoalh/deno-fmt-ignore-line-reason`

Require the [Deno format ignore line directive][deno-directive-fmt-ignore] have a reason.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  //deno-fmt-ignore
  if (foo) {
  }

  /* ✔️ VALID */
  //deno-fmt-ignore It is fine.
  if (foo) {
  }
  ```

[deno-directive-fmt-ignore]: https://docs.deno.com/runtime/reference/cli/fmt/#ignoring-code
