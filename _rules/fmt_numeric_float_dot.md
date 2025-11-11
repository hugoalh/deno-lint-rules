# `hugoalh/fmt-numeric-float-dot`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Require normalize the float of the numeric.

## 🔧 Options

### `preferFloat`

`{boolean = false}` Whether prefer float instead of integer; Not affect if the absolute value is less than 1.

| **Original** | **`false`** | **`true`** |
|:-:|:-:|:-:|
| `.5` | `0.5` | `0.5` |
| `2.` | `2` | `2.0` |
| `-.7` | `-0.7` | `-0.7` |
| `-4.` | `-4` | `-4.0` |

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = .5;

  /* ✔️ VALID */
  const foo = 0.5;
  ```
- ```ts
  /* ❌ INVALID */
  const foo = 2.;

  /* ✔️ VALID */
  const foo = 2;
  ```

## 📚 Resources

- [ESLint rule `no-floating-decimal`](https://eslint.org/docs/latest/rules/no-floating-decimal)
