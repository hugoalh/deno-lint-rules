# `hugoalh/consistent-jsdoc-tag`

> ✔️ Recommended; Enable by default.

> 🩹 Fixer is available.

Require consistent use of JSDoc tags without its synonym tags.

| **Target** | **Replacement** |
|:--|:--|
| `arg` | `param` |
| `argument` | `param` |
| `augments` | `extends` |
| `const` | `constant` |
| `defaultvalue` | `default` |
| `defaultValue` | `default` |
| `desc` | `description` |
| `exception` | `throws` |
| `func` | `function` |
| `prop` | `property` |
| `return` | `returns` |
| `typeparam` | `template` |
| `typeParam` | `template` |
| `virtual` | `abstract` |
| `yield` | `yields` |

## 🔧 Options

### `synonyms`

`{Record<string, string | false | null | undefined>}` Configure JSDoc tag synonyms, in pair of target (key) and replacement (value), define replacement (value) with `false`, `null`, or `undefined` to disable default target (key) replacement.

Prefix with `@` is optional.

## ✍️ Examples

- ```ts
  /* ❌ INVALID */
  export interface Foo {
    /**
     * @defaultvalue {5}
     */
    max?: number;
  }

  /* ✔️ VALID */
  export interface Foo {
    /**
     * @default {5}
     */
    max?: number;
  }
  ```
