# `hugoalh/no-using`

Forbid use of [`using`][ecmascript-using] statement and [`await using`][ecmascript-await-using] statement.

This is aimed for whose have [Baseline][ecmascript-baseline] requirement; Also do not use this if:

- the runtime is Deno, or
- transpile scripts from TypeScript to JavaScript.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  using server = Deno.serve({ port: 8000 }, () => {
    return new Response("Hello, world!");
  });

  const response = await fetch("http://localhost:8000");
  console.log(await response.text());
  ```

[ecmascript-await-using]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/await_using
[ecmascript-baseline]: https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility
[ecmascript-using]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/using
