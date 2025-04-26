# `hugoalh/no-duplicate-set-types`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid duplicate types when [intersection][typescript-operator-intersection] or [union][typescript-operator-union].

[Intersection][typescript-operator-intersection] or [union][typescript-operator-union] multiple same types is a bad practice, cause confusion, and cause TypeScript Language Server consume more resources, which have the same effect as single same type, possibly not intended and is mergeable.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  type Foo = boolean & boolean & number & number & string & string & null & null;

  /* ✔️ VALID */
  type Foo = boolean & number & string & null;
  ```
- ```ts
  /* ❌ INVALID */
  type Foo = boolean | boolean | number | number | string | string | null | null;

  /* ✔️ VALID */
  type Foo = boolean | number | string | null;
  ```
- ```ts
  /* ❌ INVALID */
  type Foo = boolean | boolean & boolean | number | number | string | string | null | null;

  /* ✔️ VALID */
  type Foo = boolean | number | string | null;
  ```

## 📜 History

- **v0.5.0:** Add.

[typescript-operator-intersection]: https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types
[typescript-operator-union]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types
