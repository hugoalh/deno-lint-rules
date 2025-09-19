# `hugoalh/no-using`

Forbid use of `using` and `await using`.

This rule is aimed for whose have [Baseline][ecmascript-baseline] requirement.

You do not need to include this rule if:

- runtime is Deno, or
- transpile from TypeScript to JavaScript.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  using server = Deno.serve({ port: 8000 }, () => {
    return new Response("Hello, world!");
  });

  const response = await fetch("http://localhost:8000");
  console.log(await response.text());
  ```

## 📜 History

- **v0.9.0:** Add.

[ecmascript-baseline]: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility
