# `hugoalh/prefer-ascii-identifier`

> ✔️ Default and recommended.

Prefer ASCII identifier, an alternative of the Deno lint rule [`prefer-ascii`](https://docs.deno.com/lint/rules/prefer-ascii/) which only enforce on the identifier.

## 🔧 Options

*This rule does not have any option.*

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
