# `hugoalh/std-on-jsr`

> ✔️ Recommended; Enable by default.

Require depend Deno Standard Library (std) from [JSR][jsr].

Deno Standard Library (std) is moved to [JSR][jsr]. Visit [Deno blog post "The Deno Standard Library is now available on JSR"](https://deno.com/blog/std-on-jsr) for more information.

## 🔧 Options

This does not have any option.

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
