# `hugoalh/prefer-hex-case`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Prefer hex case.

Hex in mix case can be difficult to read.

## 🔧 Options

### `lowercase`

`{boolean = false}` Whether prefer lower case for the hex.

- **`false`:** `0x34ABn`, `0x34AB`, `"\u34AB"`
- **`true`:** `0x34abn`, `0x34ab`, `"\u34ab"`

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  const foo = 0x34cdn;

  /* ✔️ VALID */
  const foo = 0x34CDn;
  ```
- ```ts
  /* ❌ INVALID */
  const foo = 0x34cd;

  /* ✔️ VALID */
  const foo = 0x34CD;
  ```
- ```ts
  /* ❌ INVALID */
  const foo = "\xa9";

  /* ✔️ VALID */
  const foo = "\xA9";

  /* ✔️ VALID */
  const foo = "\\xa9";
  ```
- ```ts
  /* ❌ INVALID */
  const foo = "\u00a9";

  /* ✔️ VALID */
  const foo = "\u00A9";

  /* ✔️ VALID */
  const foo = "\\u00a9";
  ```
- ```ts
  /* ❌ INVALID */
  const foo = "\ud87e\udc04";

  /* ✔️ VALID */
  const foo = "\uD87E\uDC04";
  ```
- ```ts
  /* ❌ INVALID */
  const foo = "\\ud87e\udc04";

  /* ✔️ VALID */
  const foo = "\\ud87e\\udc04";
  ```
- ```ts
  /* ❌ INVALID */
  const foo = "\u{2f804}";

  /* ✔️ VALID */
  const foo = "\u{2F804}";
  ```

## 📜 History

- **v0.9.0:** Add.
