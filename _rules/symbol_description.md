# `hugoalh/symbol-description`

Require [`Symbol`][ecmascript-symbol] to have the description.

Provide the description for the [`Symbol`][ecmascript-symbol]s will make debugging easier; When a [`Symbol`][ecmascript-symbol] is logged the description is used:

```ts
const foo = Symbol("some description");

console.log(foo);
//=> Symbol("some description")
```

It may facilitate identifying [`Symbol`][ecmascript-symbol]s when one is observed during debugging.

## 🏷️ Tags

*This rule does not have any tag.*

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = Symbol();

  /* ✔️ VALID */
  const foo = Symbol("some description");
  ```
- ```ts
  /* ✔️ VALID */
  const someString = "some description";
  const foo = Symbol(someString);
  ```

## 📚 Resources

- [ESLint rule `symbol-description`](https://eslint.org/docs/latest/rules/symbol-description)

[ecmascript-symbol]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol
