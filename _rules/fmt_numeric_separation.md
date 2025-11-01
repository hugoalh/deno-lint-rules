# `hugoalh/fmt-numeric-separation`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Require normalize the numeric separation.

Irregular numeric separation can be difficult to read.

## 🔧 Options

### `digits`

`{number | null = null}` Number of digits per separation, which apply to every numerics. Default to automatic per numeric.

```ts
---
digits: null
---
123456789n;
1_23_45_67_89n;
123_456_789n;
1_2345_6789n;
123456789;
1_23_45_67_89;
123_456_789;
1_2345_6789;
```
```ts
---
digits: 3
---
123_456_789n;
123_456_789;
```

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = 12_34567_890n;

  /* ✔️ VALID */
  const foo = 1_234_567_890n;

  /* ✔️ VALID */
  const foo = 1234567890n;
  ```
- ```ts
  /* ❌ INVALID */
  const foo = 12_34567_890;

  /* ✔️ VALID */
  const foo = 1_234_567_890;

  /* ✔️ VALID */
  const foo = 1234567890;
  ```
