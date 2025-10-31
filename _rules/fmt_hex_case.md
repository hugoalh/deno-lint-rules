# `hugoalh/fmt-hex-case`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Require normalize the case of the hex number; Default to upper case.

Hex number in mix cases are difficult to read.

## 🔧 Options

### `lowercase`

`{boolean = false}` Whether to normalize to lower case.

| **On** | **`false`** | **`true`** |
|:-:|:-:|:-:|
| **BigInt** | `0x34ABn` | `0x34abn` |
| **Number** | `0x34AB` | `0x34ab` |
| **String** | `"\u34AB"` | `"\u34ab"` |

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
