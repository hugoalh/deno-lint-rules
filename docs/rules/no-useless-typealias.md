# `hugoalh/no-useless-typealias`

> [!CAUTION]
> - This rule is renamed to [`hugoalh/no-useless-type`](https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-useless-type.md) since v0.7.0.

> ✔️ Default and recommended.

Forbid useless [type alias][typescript-typealias].

Declare the [type alias][typescript-typealias] with simple type is a bad practice, cause confusion, cause TypeScript Language Server consume more resources, pointless, and unnecessary.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  type Foo = any;
  ```
- ```ts
  /* ❌ INVALID */
  type Foo = bigint;
  ```
- ```ts
  /* ❌ INVALID */
  type Foo = boolean;
  ```
- ```ts
  /* ❌ INVALID */
  type Foo = never;
  ```
- ```ts
  /* ❌ INVALID */
  type Foo = null;
  ```
- ```ts
  /* ❌ INVALID */
  type Foo = number;
  ```
- ```ts
  /* ❌ INVALID */
  type Foo = object;
  ```
- ```ts
  /* ❌ INVALID */
  type Foo = string;
  ```
- ```ts
  /* ❌ INVALID */
  type Foo = symbol;
  ```
- ```ts
  /* ❌ INVALID */
  type Foo = undefined;
  ```
- ```ts
  /* ❌ INVALID */
  type Foo = unknown;
  ```
- ```ts
  /* ❌ INVALID */
  type Foo = void;
  ```
- ```ts
  /* ❌ INVALID */
  type Foo = Body;
  ```
- ```ts
  /* ✔️ VALID */
  type Foo = number | string;
  ```

[typescript-typealias]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
