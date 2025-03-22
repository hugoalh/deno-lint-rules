# `hugoalh/no-duplicate-set-types`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid duplicate intersection and/or union types.

Intersection or union multiple same types have the same effect as single same type, which is a bad practice, cause confusion, and cause TypeScript Language Server consume more resources.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  type Foo = boolean & boolean & number & number & string & string & null & null;
  ```
- ```ts
  type Foo = boolean | boolean | number | number | string | string | null | null;
  ```
- ```ts
  type Foo = boolean | boolean & boolean | number | number | string | string | null | null;
  ```

## ✔️ Valid

- ```ts
  type Foo = boolean | number | string | null;
  ```
