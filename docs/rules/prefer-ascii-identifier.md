# `hugoalh/prefer-ascii-identifier`

> ✔️ Default and recommended.

Prefer ASCII identifier, an alternative of the Deno lint rule [`prefer-ascii`](https://docs.deno.com/lint/rules/prefer-ascii/) which only enforce on the identifier.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  const π = Math.PI;
  ```
- ```ts
  function こんにちは(名前: string) {
    console.log(`こんにちは、${名前}さん`);
  }
  ```
- ```ts
  class Cafè {}
  ```

## ✔️ Valid

- ```ts
  const pi = Math.PI;
  ```
- ```ts
  function hello(name: string) {
    console.log(`こんにちは、${name}さん`);
  }
  ```
- ```ts
  class Cafe {}
  ```
