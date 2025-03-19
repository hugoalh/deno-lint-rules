# `hugoalh/no-unsafe-number`

> ✔️ Default and recommended.

Forbid unsafe number.

Number literals with values equal to 2<sup>53</sup> or greater are too large to be represented accurately.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  const foo = 98765432109876543210;
  ```
- ```ts
  const bar = 98765432109876543.2109;
  ```

## ✔️ Valid

- ```ts
  const foo = 98765432109876543210n;
  ```
- ```ts
  const bar = 9876543.2109;
  ```
