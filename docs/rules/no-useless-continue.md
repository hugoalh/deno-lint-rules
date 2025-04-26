# `hugoalh/no-useless-continue`

> ✔️ Default and recommended.

> 🩹 Automatically fixable.

Forbid useless [`continue`][ecmascript-continue] statement.

Statement [`continue`][ecmascript-continue] at the end of the loop statement and without label is useless.

## 🔧 Options

*This rule does not have any option.*

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  let text = "";
  for (let i = 0; i < 10; i += 1) {
    text = text + i;
    continue;
  }
  console.log(text);
  //=> "0123456789"

  /* ✔️ VALID */
  let text = "";
  for (let i = 0; i < 10; i += 1) {
    text = text + i;
  }
  console.log(text);
  //=> "0123456789"
  ```
- ```ts
  /* ✔️ VALID */
  let text = "";
  for (let i = 0; i < 10; i += 1) {
    if (i === 3) {
      continue;
    }
    text = text + i;
  }
  console.log(text);
  //=>"012456789"
  ```
- ```ts
  /* ✔️ VALID */
  let i = 0;
  let j = 8;
  checkIAndJ: while (i < 4) {
    console.log(`i: ${i}`);
    i += 1;
    checkJ: while (j > 4) {
      console.log(`j: ${j}`);
      j -= 1;
      if (j % 2 === 0) {
        continue checkJ;
      }
      console.log(`${j} is odd.`);
    }
    console.log(`i = ${i}`);
    console.log(`j = ${j}`);
  }
  ```

## 📜 History

- **v0.4.0:** Add.

[ecmascript-continue]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/continue
