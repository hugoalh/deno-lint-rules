# `hugoalh/no-import-data`

> ✔️ Default and recommended.

Forbid import module via protocol `data:`.

Import module via protocol `data:` is a bad practice as it is hard to maintenance and not secure.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  import x from "data:text/javascript,export default 42;";
  ```

## ✔️ Valid

- ```ts
  const x = 42;
  ```
