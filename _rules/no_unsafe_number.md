# `hugoalh/no-unsafe-number`

> ✔️ Recommended; Enable by default.

Forbid unsafe [number][ecmascript-number].

[Number][ecmascript-number] literals with values equal to 2<sup>53</sup> or greater are too large to be represented accurately.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = 98765432109876543210;

  /* ✔️ VALID */
  const foo = 98765432109876543210n;
  ```
- ```ts
  /* ❌ INVALID */
  const bar = 98765432109876543.2109;
  ```
- ```ts
  /* ✔️ VALID */
  const bar = 9876543.2109;
  ```

## 📜 History

- *History before v0.4.0 is not displayed.*

[ecmascript-number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number
