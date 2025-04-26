# `hugoalh/no-useless-else`

> ✔️ Default and recommended.

Forbid useless [`else`][ecmascript-if] statement.

If the statement [`if`][ecmascript-if] has [`break`][ecmascript-break], [`continue`][ecmascript-continue], [`return`][ecmascript-return], or [`throw`][ecmascript-throw] statement at the end, the statement [`else`][ecmascript-if] become unnecessary, its contents can be placed outside of the block.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  function foo1() {
    if (x) {
      return y;
    } else {
      return z;
    }
  }

  /* ✔️ VALID */
  function foo1() {
    if (x) {
      return y;
    }
    return z;
  }
  ```
- ```ts
  /* ❌ INVALID */
  function foo2() {
    if (x) {
      return y;
    } else if (z) {
      return w;
    } else {
      return t;
    }
  }

  /* ✔️ VALID */
  function foo2() {
    if (x) {
      return y;
    }
    if (z) {
      return w;
    }
    return t;
  }
  ```
- ```ts
  /* ❌ INVALID */
  function foo3() {
    if (x) {
      return y;
    } else {
      var t = "foo";
    }
    return t;
  }

  /* ✔️ VALID */
  function foo3() {
    if (x) {
      return y;
    } 
    var t = "foo";
    return t;
  }
  ```
- ```ts
  /* ❌ INVALID */
  function foo4() {
    if (error) {
      return 'It failed';
    } else {
      if (loading) {
        return "It's still loading";
      }
    }
  }

  /* ✔️ VALID */
  function foo4() {
    if (error) {
      return 'It failed';
    }
    if (loading) {
      return "It's still loading";
    }
  }
  ```
- ```ts
  /* ❌ INVALID */
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

  /* ✔️ VALID */
  function foo5() {
    if (x) {
      if (y) {
        return y;
      }
      return x
    }
    return z;
  }
  ```
- ```ts
  /* ❌ INVALID */
  function foo6() {
    if (error) {
      return 'It failed';
    } else if (loading) {
      return "It's still loading";
    }
  }

  /* ✔️ VALID */
  function foo6() {
    if (error) {
      return 'It failed';
    }
    if (loading) {
      return "It's still loading";
    }
  }
  ```
- ```ts
  /* ❌ INVALID */
  function foo7() {
    if (x) {
      return y;
    } else if (z) {
      var t = "foo";
    } else {
      return w;
    }
  }

  /* ✔️ VALID */
  function foo7() {
    if (x) {
      return y;
    }
    if (z) {
      var t = "foo";
    } else {
      return w;
    }
  }
  ```

## 📜 History

- **v0.7.0:** Add and rename from [`hugoalh/no-if-return-else`][rule-no-if-return-else].

## 📚 Resources

- [ESLint rule `no-else-return`](https://eslint.org/docs/latest/rules/no-else-return)

[ecmascript-break]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break
[ecmascript-continue]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue
[ecmascript-if]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
[ecmascript-return]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return
[ecmascript-throw]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
[rule-no-if-return-else]: https://github.com/hugoalh/deno-lint-rules/blob/main/docs/rules/no-if-return-else.md
