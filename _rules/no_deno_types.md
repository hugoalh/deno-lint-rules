# `hugoalh/no-deno-types`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Forbid use of `@deno-types` directive.

> If you are consuming a JavaScript module and you have either created types (a `.d.ts` file) or have otherwise obtained the types you want to use, you can instruct Deno to use that file when type checking, instead of the JavaScript file, using the [`@ts-types`][typescript-ts-types] compiler hint.
>
> For example if you have a JavaScript module, `coolLib.js`, and a separate `coolLib.d.ts` file, you would import it like this:
>
> ```ts
> // @ts-types="./coolLib.d.ts"
> import * as coolLib from "./coolLib.js";
> ```
>
> When you are performing type checking on `coolLib` and using it in your file, the TypeScript type definitions from `coolLib.d.ts` will take precedence over examining the JavaScript file.
>
> In the past the [`@ts-types`][typescript-ts-types] directive was called `@deno-types`. This alias still works, but is not recommended anymore. Use [`@ts-types`][typescript-ts-types].

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  // @deno-types="./coolLib.d.ts"
  import * as coolLib from "./coolLib.js";

  /* ✔️ VALID */
  // @ts-types="./coolLib.d.ts"
  import * as coolLib from "./coolLib.js";
  ```

[typescript-ts-types]: https://docs.deno.com/runtime/reference/ts_config_migration/#providing-types-when-importing
