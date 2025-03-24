# `hugoalh/no-useless-typealias`

> ✔️ Default and recommended.

Forbid useless [type alias][typescript-typealias].

Declare the [type alias][typescript-typealias] with simple type is a bad practice, cause confusion, cause TypeScript Language Server consume more resources, pointless, and unnecessary.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  type Foo = any;
  ```
- ```ts
  type Foo = bigint;
  ```
- ```ts
  type Foo = boolean;
  ```
- ```ts
  type Foo = never;
  ```
- ```ts
  type Foo = null;
  ```
- ```ts
  type Foo = number;
  ```
- ```ts
  type Foo = object;
  ```
- ```ts
  type Foo = string;
  ```
- ```ts
  type Foo = symbol;
  ```
- ```ts
  type Foo = undefined;
  ```
- ```ts
  type Foo = unknown;
  ```
- ```ts
  type Foo = void;
  ```
- ```ts
  type Foo = Body;
  ```

## ✔️ Valid

- ```ts
  type Foo = number | string;
  ```

[typescript-typealias]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
