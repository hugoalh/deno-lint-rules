# `hugoalh/no-class-constructor-parameter-property`

Forbid use of [class constructor parameter property][typescript-class-constructor-parameter-property].

[Class constructor parameter property][typescript-class-constructor-parameter-property] is not an erasable TypeScript syntax for JavaScript:

- Require transformation.
- Unable to type strip.

## 🔧 Options

This does not have any option.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  class Params {
    constructor(
      public readonly x: number,
      protected y: number,
      private z: number
    ) {
      // ...
    }
  }

  /* ✔️ VALID */
  class Params {
    public readonly x: number;
    protected y: number;
    private z: number;
    constructor(
      x: number,
      y: number,
      z: number
    ) {
      this.x = x;
      this.y = y;
      this.z = z;
      // ...
    }
  }
  ```

[typescript-class-constructor-parameter-property]: https://www.typescriptlang.org/docs/handbook/2/classes.html#parameter-properties
