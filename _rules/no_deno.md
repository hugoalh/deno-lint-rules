# `hugoalh/no-deno`

Forbid use of [`Deno`][deno-deno].

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  try {
    const file = await Deno.open("./some/file.txt");
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      console.error("the file was not found");
    } else {
      // otherwise re-throw
      throw error;
    }
  }
  ```

[deno-deno]: https://docs.deno.com/api/deno/
