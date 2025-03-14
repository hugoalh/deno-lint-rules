# `hugoalh/std-on-jsr`

> ✔️ Default and recommended.

Enforce import Deno Standard Library (std) via [JSR][jsr].

Deno Standard Library (std) is moved from [Deno Land Module Registry](https://deno.land/x) to [JSR][jsr]. See [this Deno blog post](https://deno.com/blog/std-on-jsr) for the details.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  import { copy } from "https://deno.land/std@0.224.0/fs/copy.ts";
  ```

## ✔️ Valid

- ```ts
  import { copy } from "jsr:@std/fs@^1.0.14/copy";
  ```

## 📚 Resources

- [Deno Standard Library (std) on Deno Land Module Registry](https://deno.land/std)
- [Deno Standard Library (std) on JSR](https://jsr.io/@std)

[jsr]: https://jsr.io/
