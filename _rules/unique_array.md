# `hugoalh/unique-array`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Require the literal array have unique elements when explicitly specify at first with comment.

```ts
[/* UNIQUE */1, 2, 3];
[/* Unique */4, 5, 6];
[/* unique */7, 8, 9];
```

> [!CAUTION]
> - The trigger behaviour is changed since v0.17.0.
>
>   || **Old** | **New** |
>   |:--|:--|:--|
>   | **Comment Type** | Only block comment | Any |
>   | **Locate** | Out-left-side of the target array | Inside and before the first element of the target array |
>   | **Locate (Multiple Comments)** | Last of the comments group | Any |

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = [/* Unique */1, 2, 3, 1];

  /* ✔️ VALID */
  const foo = [/* Unique */1, 2, 3];

  /* ✔️ VALID */
  const foo = [1, 2, 3, 1];
  ```
