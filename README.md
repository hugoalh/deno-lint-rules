# hugoalh Deno Lint Rules

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/deno-lint-rules](https://img.shields.io/github/v/release/hugoalh/deno-lint-rules?label=hugoalh/deno-lint-rules&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/deno-lint-rules")](https://github.com/hugoalh/deno-lint-rules)
[![JSR: @hugoalh/deno-lint-rules](https://img.shields.io/jsr/v/@hugoalh/deno-lint-rules?label=@hugoalh/deno-lint-rules&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/deno-lint-rules")](https://jsr.io/@hugoalh/deno-lint-rules)

A Deno module for hugoalh Deno lint rules.

## 🔰 Begin

### 🎯 Targets

|  | **Remote** | **JSR** |
|:--|:--|:--|
| **[Deno](https://deno.land/)** >= v2.2.0 | ✔️ | ✔️ |

> [!NOTE]
> - It is possible to use this module in other methods/ways which not listed in here, however those methods/ways are not officially supported, and should beware maybe cause security issues.

### #️⃣ Resources Identifier

- **Remote - GitHub Raw:**
  ```
  https://raw.githubusercontent.com/hugoalh/deno-lint-rules/{Tag}/mod.ts
  ```
- **JSR:**
  ```
  [jsr:]@hugoalh/deno-lint-rules[@{Tag}]
  ```

> [!NOTE]
> - For usage of remote resources, it is recommended to import the entire module with the main path `mod.ts`, however it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `_bar`, `_foo`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - For usage of JSR resources, it is recommended to import the entire module with the main entrypoint, however it is also able to import part of the module with sub entrypoint if available, please visit the [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub entrypoints.
> - It is recommended to use this module with tag for immutability.

### 🛡️ Runtime Permissions

*This module does not request any runtime permission.*

## 🧩 Rules

> | **Legend** | **Description** |
> |:-:|:--|
> | ✔️ | Default and recommended. |
> | 🔧 | Configurable. |
> | 🩹 | Automatically fixable. |

### `hugoalh/no-import-protocol-http`

✔️🩹 Forbid import module from protocol `http:`.

### `hugoalh/no-import-protocol-https`

Forbid import module from protocol `https:`.

### `hugoalh/no-import-protocol-jsr`

Forbid import module from protocol `jsr:`.

### `hugoalh/no-import-protocol-npm`

Forbid import module from protocol `npm:`.

### `hugoalh/prefer-ascii-identifier`

✔️ Prefer ASCII identifier, a less strict alternative of the official rule [`prefer-ascii`](https://docs.deno.com/lint/rules/prefer-ascii/).

### `hugoalh/restrict-module`

✔️🔧 Control and restrict module import. By default, forbid import module from protocols `data:` and `file:`.

### `hugoalh/std-on-jsr`

✔️ Enforce import Deno Standard Library (std) from JSR.

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/documentation_generator/)
>   - [JSR](https://jsr.io/@hugoalh/deno-lint-rules)

## ✍️ Examples

- Use recommended ruleset via Deno configuration file
  ```jsonc
  {
    "lint": {
      "plugins": [
        "jsr:@hugoalh/deno-lint-rules[@{Tag}]"
      ]
    }
  }
  ```
- Configure rules
  ```ts
  /* .hugoalh.lint.ts */
  import { configureDenoLintPlugin } from "./mod.ts";
  export default configureDenoLintPlugin({
    ...
  }) satisfies Deno.lint.Plugin as Deno.lint.Plugin;
  ```
  ```jsonc
  /* deno.jsonc */
  {
    "lint": {
      "plugins": [
        "./.hugoalh.lint.ts"
      ]
    }
  }
  ```
