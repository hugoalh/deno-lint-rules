# `hugoalh/no-useless-typealias`

> ✔️ Default and recommended.

Forbid useless [type alias][ts-typealias].

Declare the [type alias][ts-typealias] with simple type is a bad practice, cause confusion, and cause TypeScript Language Server consume more resources.

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

[ts-typealias]: https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-aliases
