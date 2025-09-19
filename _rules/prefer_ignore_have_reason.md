# `hugoalh/prefer-ignore-have-reason`

Prefer ignore directive have reason.

This rule currently lint for [Deno lint ignore directive][deno-ignore-directive] only, use these rules for other kind of ignore directive:

- **TypeScript:** [`ban-ts-comment`][rule-ban-ts-comment]

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  //deno-lint-ignore no-empty
  if (foo) {
  }

  /* ✔️ VALID */
  //deno-lint-ignore no-empty -- It is fine.
  if (foo) {
  }
  ```

[deno-ignore-directive]: https://docs.deno.com/runtime/reference/cli/lint/#ignore-directives
[rule-ban-ts-comment]: https://docs.deno.com/lint/rules/ban-ts-comment/
