# `hugoalh/prefer-symbol-description`

Prefer [`Symbol`][js-symbol] to have a description.

Provide the description for easier debugging, when a [`Symbol`][js-symbol] is logged the description is used:

```ts
const foo = Symbol("some description");

console.log(foo);
//=> Symbol("some description")
```

It may facilitate identifying [`Symbol`][js-symbol]s when one is observed during debugging.

## 🔧 Options

*This rule does not have any option.*

## ❌ Invalid

- ```ts
  const foo = Symbol();
  ```

## ✔️ Valid

- ```ts
  const foo = Symbol("some description");
  ```
- ```ts
  const someString = "some description";
  const foo = Symbol(someString);
  ```

## 📚 Resources

- [ESLint rule `symbol-description`](https://eslint.org/docs/latest/rules/symbol-description)

[js-symbol]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/Symbol
