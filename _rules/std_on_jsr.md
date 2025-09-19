# `hugoalh/std-on-jsr`

> ✔️ Recommended; Enable by default.

Enforce depend Deno Standard Library (std) via [JSR][jsr].

Deno Standard Library (std) is moved from [Deno Land Module Registry](https://deno.land/x) to [JSR][jsr]. Visit [Deno blog post "The Deno Standard Library is now available on JSR"](https://deno.com/blog/std-on-jsr) for more information.

> [!NOTE]
> - Due to the Deno linter plugin API limitations, detection for imports map is not possible.

## 🏷️ Tags

- `recommended`
- `security`

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  import { copy } from "https://deno.land/std@0.224.0/fs/copy.ts";

  /* ✔️ VALID */
  import { copy } from "jsr:@std/fs@^1.0.14/copy";
  ```

## 📚 Resources

- [Deno Standard Library (std) on Deno Land Module Registry](https://deno.land/std)
- [Deno Standard Library (std) on JSR](https://jsr.io/@std)

[jsr]: https://jsr.io/
