# `hugoalh/ascii-identifier`

> ✔️ Recommended; Enable by default.

Require the identifier contain only ASCII characters.

Note that identifiers from build in, module, or vendor are also affected.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const π = Math.PI;

  /* ✔️ VALID */
  const pi = Math.PI;
  ```
- ```ts
  /* ❌ INVALID */
  function こんにちは(名前: string) {
    console.log(`こんにちは、${名前}さん`);
  }

  /* ✔️ VALID */
  function hello(name: string) {
    console.log(`こんにちは、${name}さん`);
  }
  ```
- ```ts
  /* ❌ INVALID */
  class Cafè {}

  /* ✔️ VALID */
  class Cafe {}
  ```

## 📚 Resources

- [Deno lint rule `prefer-ascii`](https://docs.deno.com/lint/rules/prefer-ascii/)
