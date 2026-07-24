# `hugoalh/flat-set-type`

> ✔️ Recommended; Enable by default.

Forbid nest same set types in [intersection][typescript-operator-intersection] or [union][typescript-operator-union].

[Intersection][typescript-operator-intersection] with child [intersection][typescript-operator-intersection] or [union][typescript-operator-union] with child [union][typescript-operator-union] have the same effect as single [intersection][typescript-operator-intersection] or [union][typescript-operator-union], possibly mergeable.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  type Foo = boolean & (number & string) & null;

  /* ✔️ VALID */
  type Foo = boolean & number & string & null;
  ```
- ```ts
  /* ❌ INVALID */
  type Foo = boolean | (number | string) | null;

  /* ✔️ VALID */
  type Foo = boolean | number | string | null;
  ```

[typescript-operator-intersection]: https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types
[typescript-operator-union]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
