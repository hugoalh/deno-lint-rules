# `hugoalh/no-character-invisible`

Forbid character which is invisible.

## 🏷️ Tags

*This rule does not have any tag.*

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = "Hello, world!";
                   //^ Unicode 002009
  /* ✔️ VALID */
  const foo = "Hello, world!";
                   //^ Unicode 000020
  ```
