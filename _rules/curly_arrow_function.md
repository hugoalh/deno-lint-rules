# `hugoalh/curly-arrow-function`

Require the body of the [arrow function][ecmascript-arrow-function] expression is in block (i.e.: surrounded by curly braces).

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const materials = ["Hydrogen", "Helium", "Lithium", "Beryllium"];
  console.log(materials.map((material) => material.length));

  /* ✔️ VALID */
  const materials = ["Hydrogen", "Helium", "Lithium", "Beryllium"];
  console.log(materials.map((material) => {
    return material.length;
  }));
  ```

## 📚 Resources

- [ESLint rule `curly`](https://eslint.org/docs/latest/rules/curly)

[ecmascript-arrow-function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
