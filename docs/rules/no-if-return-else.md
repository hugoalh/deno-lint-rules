# `hugoalh/no-if-return-else`

> ✔️ Default and recommended.

Forbid statement `else` after statement `if` with return statement at the end.

If statement `if` has return statement at the end, the statement `else` becomes unnecessary. Its contents can be placed outside of the block.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  function foo1() {
    if (x) {
      return y;
    } else {
      return z;
    }
  }
  ```
- ```ts
  function foo2() {
    if (x) {
      return y;
    } else if (z) {
      return w;
    } else {
      return t;
    }
  }
  ```
- ```ts
  function foo3() {
    if (x) {
      return y;
    } else {
      var t = "foo";
    }
    return t;
  }
  ```
- ```ts
  function foo4() {
    if (error) {
      return 'It failed';
    } else {
      if (loading) {
        return "It's still loading";
      }
    }
  }
  ```
- ```ts
  function foo5() {
    if (x) {
      if (y) {
        return y;
      } else {
        return x;
      }
    } else {
      return z;
    }
  }
  ```
- ```ts
  function foo6() {
    if (error) {
      return 'It failed';
    } else if (loading) {
      return "It's still loading";
    }
  }
  ```
- ```ts
  function foo7() {
    if (x) {
      return y;
    } else if (z) {
      var t = "foo";
    } else {
      return w;
    }
  }
  ```

## ✔️ Valid

- ```ts
  function foo1() {
    if (x) {
      return y;
    }
    return z;
  }
  ```
- ```ts
  function foo3() {
    if (x) {
      if (z) {
        return y;
      }
    } else {
      return z;
    }
  }
  ```

## 📚 Resources

- [ESLint rule `no-else-return`](https://eslint.org/docs/latest/rules/no-else-return)
