import {
	constructDenoLintPlugin,
	type DenoLintRuleDataPre
} from "./_template.ts";
import {
	data as ruleMaxParams,
	type DenoLintRuleMaxParamsOptions
} from "./_rules/max_params.ts";
import { data as ruleNoAlert } from "./_rules/no_alert.ts";
import { data as ruleNoConfirm } from "./_rules/no_confirm.ts";
import { data as ruleNoDuplicateTypeOfs } from "./_rules/no_duplicate_typeofs.ts";
import { data as ruleNoEmptyYield } from "./_rules/no_empty_yield.ts";
import { data as ruleNoEnum } from "./_rules/no_enum.ts";
import { data as ruleNoIfReturnElse } from "./_rules/no_if_return_else.ts";
import { data as ruleNoImportAbsolute } from "./_rules/no_import_absolute.ts";
import { data as ruleNoImportData } from "./_rules/no_import_data.ts";
import { data as ruleNoImportFile } from "./_rules/no_import_file.ts";
import { data as ruleNoImportHTTP } from "./_rules/no_import_http.ts";
import { data as ruleNoImportHTTPS } from "./_rules/no_import_https.ts";
import {
	data as ruleNoImportJSR,
	type DenoLintRuleNoImportJSROptions
} from "./_rules/no_import_jsr.ts";
import { data as ruleNoImportNode } from "./_rules/no_import_node.ts";
import {
	data as ruleNoImportNPM,
	type DenoLintRuleNoImportNPMOptions
} from "./_rules/no_import_npm.ts";
import { data as ruleNoImportSelf } from "./_rules/no_import_self.ts";
import { data as ruleNoNaN } from "./_rules/no_nan.ts";
import { data as ruleNoPrompt } from "./_rules/no_prompt.ts";
import { data as ruleNoTernaryNest } from "./_rules/no_ternary_nest.ts";
import { data as ruleNoUnsafeNumber } from "./_rules/no_unsafe_number.ts";
import { data as ruleNoUseStrict } from "./_rules/no_use_strict.ts";
import { data as ruleNoUselessBlock } from "./_rules/no_useless_block.ts";
import { data as ruleNoUselessClassConstructor } from "./_rules/no_useless_class_constructor.ts";
import { data as ruleNoUselessClassStaticBlock } from "./_rules/no_useless_class_static_block.ts";
import { data as ruleNoUselessContinue } from "./_rules/no_useless_continue.ts";
import { data as ruleNoUselessExport } from "./_rules/no_useless_export.ts";
import { data as ruleNoUselessExpression } from "./_rules/no_useless_expression.ts";
import { data as ruleNoUselessSwitch } from "./_rules/no_useless_switch.ts";
import { data as ruleNoUselessTernary } from "./_rules/no_useless_ternary.ts";
import { data as ruleNoUselessTry } from "./_rules/no_useless_try.ts";
import { data as rulePreferASCIIIdentifier } from "./_rules/prefer_ascii_identifier.ts";
import { data as rulePreferImportAtBegin } from "./_rules/prefer_import_at_begin.ts";
import { data as rulePreferInterface } from "./_rules/prefer_interface.ts";
import {
	data as rulePreferRegExpFlagUnicode,
	type DenoLintRulePreferRegExpFlagUnicodeOptions
} from "./_rules/prefer_regexp_flag_unicode.ts";
import { data as rulePreferStatementBlock } from "./_rules/prefer_statement_block.ts";
import { data as rulePreferSymbolDescription } from "./_rules/prefer_symbol_description.ts";
import { data as ruleStdOnJSR } from "./_rules/std_on_jsr.ts";
//deno-lint-ignore no-explicit-any
const rules: readonly DenoLintRuleDataPre<any>[] = [
	ruleMaxParams,
	ruleNoAlert,
	ruleNoConfirm,
	ruleNoDuplicateTypeOfs,
	ruleNoEmptyYield,
	ruleNoEnum,
	ruleNoIfReturnElse,
	ruleNoImportAbsolute,
	ruleNoImportData,
	ruleNoImportFile,
	ruleNoImportHTTP,
	ruleNoImportHTTPS,
	ruleNoImportJSR,
	ruleNoImportNode,
	ruleNoImportNPM,
	ruleNoNaN,
	ruleNoPrompt,
	ruleNoImportSelf,
	ruleNoTernaryNest,
	ruleNoUnsafeNumber,
	ruleNoUseStrict,
	ruleNoUselessBlock,
	ruleNoUselessClassConstructor,
	ruleNoUselessClassStaticBlock,
	ruleNoUselessContinue,
	ruleNoUselessExport,
	ruleNoUselessExpression,
	ruleNoUselessSwitch,
	ruleNoUselessTernary,
	ruleNoUselessTry,
	rulePreferASCIIIdentifier,
	rulePreferImportAtBegin,
	rulePreferInterface,
	rulePreferRegExpFlagUnicode,
	rulePreferStatementBlock,
	rulePreferSymbolDescription,
	ruleStdOnJSR
];
//deno-lint-ignore no-explicit-any
const rulesIdentifier: readonly string[] = rules.map(({ identifier }: DenoLintRuleDataPre<any>): string => {
	return identifier;
});
for (let index: number = 0; index < rulesIdentifier.length; index += 1) {
	const identifier: string = rulesIdentifier[index];
	if (rulesIdentifier.toSpliced(index, 1).includes(identifier)) {
		throw new Error(`Found duplicated rule identifier \`${identifier}\`! Please submit a bug report.`);
	}
}
export interface DenoLintRulesOptions {
	/**
	 * Restrict maximum number of parameters per function/method definition.
	 * @default {false}
	 */
	"max-params"?: boolean | DenoLintRuleMaxParamsOptions;
	/**
	 * Forbid use of `alert`.
	 * @default {false}
	 */
	"no-alert"?: boolean;
	/**
	 * Forbid use of `confirm`.
	 * @default {false}
	 */
	"no-confirm"?: boolean;
	/**
	 * Forbid duplicate `typeof` operators.
	 * @default {true}
	 */
	"no-duplicate-typeofs"?: boolean;
	/**
	 * Forbid empty `yield`
	 * @default {true}
	 */
	"no-empty-yield"?: boolean;
	/**
	 * Forbid use of `enum`.
	 * @default {true}
	 */
	"no-enum"?: boolean;
	/**
	 * Forbid statement `else` after statement `if` with return statement at the end.
	 * @default {true}
	 */
	"no-if-return-else"?: boolean;
	/**
	 * Forbid import module via absolute path.
	 * @default {true}
	 */
	"no-import-absolute"?: boolean;
	/**
	 * Forbid import module via protocol `data:`.
	 * @default {true}
	 */
	"no-import-data"?: boolean;
	/**
	 * Forbid import module via protocol `file:`.
	 * @default {true}
	 */
	"no-import-file"?: boolean;
	/**
	 * Forbid import module via protocol `http:`.
	 * @default {true}
	 */
	"no-import-http"?: boolean;
	/**
	 * Forbid import module via protocol `https:`.
	 * @default {false}
	 */
	"no-import-https"?: boolean;
	/**
	 * Forbid import JSR module. By default, only forbid import JSR module via URL.
	 * @default {true}
	 */
	"no-import-jsr"?: boolean | DenoLintRuleNoImportJSROptions;
	/**
	 * Forbid import module via protocol `node:`.
	 * @default {false}
	 */
	"no-import-node"?: boolean;
	/**
	 * Forbid import NPM module.
	 * @default {false}
	 */
	"no-import-npm"?: boolean | DenoLintRuleNoImportNPMOptions;
	/**
	 * Forbid the module import itself.
	 * @default {true}
	 */
	"no-import-self"?: boolean;
	/**
	 * Forbid use of `NaN`.
	 * @default {true}
	 */
	"no-nan"?: boolean;
	/**
	 * Forbid use of `prompt`.
	 * @default {false}
	 */
	"no-prompt"?: boolean;
	/**
	 * Forbid nested ternary expression.
	 * @default {false}
	 */
	"no-ternary-nest"?: boolean;
	/**
	 * Forbid unsafe number.
	 * @default {true}
	 */
	"no-unsafe-number"?: boolean;
	/**
	 * Forbid use of `use strict` directive as ECMAScript modules always have strict mode semantics.
	 * @default {true}
	 */
	"no-use-strict"?: boolean;
	/**
	 * Forbid useless block.
	 * @default {true}
	 */
	"no-useless-block"?: boolean;
	/**
	 * Forbid useless class constructor.
	 * @default {true}
	 */
	"no-useless-class-constructor"?: boolean;
	/**
	 * Forbid useless class static (initialization) block.
	 * @default {true}
	 */
	"no-useless-class-static-block"?: boolean;
	/**
	 * Forbid useless `continue` statement.
	 * @default {true}
	 */
	"no-useless-continue"?: boolean;
	/**
	 * Forbid useless `export` statement.
	 * @default {true}
	 */
	"no-useless-export"?: boolean;
	/**
	 * Forbid useless expression which will do nothing, possibly missing the assignment or call.
	 * @default {true}
	 */
	"no-useless-expression"?: boolean;
	/**
	 * Forbid useless `switch` statement.
	 * @default {true}
	 */
	"no-useless-switch"?: boolean;
	/**
	 * Forbid useless ternary expression.
	 * @default {true}
	 */
	"no-useless-ternary"?: boolean;
	/**
	 * Forbid useless `try-catch-finally` statement.
	 * @default {true}
	 */
	"no-useless-try"?: boolean;
	/**
	 * Prefer ASCII identifier, an alternative of the Deno lint rule `prefer-ascii` which only enforce on the identifier.
	 * @default {true}
	 */
	"prefer-ascii-identifier"?: boolean;
	/**
	 * Forbid any `import` statement that come after non `import` statements.
	 * @default {true}
	 */
	"prefer-import-at-begin"?: boolean;
	/**
	 * Prefer to use `interface` instead of `type`.
	 * @default {true}
	 */
	"prefer-interface"?: boolean;
	/**
	 * Prefer the regular expression is contain Unicode flag (`u` or `v`).
	 * @default {false}
	 */
	"prefer-regexp-flag-unicode"?: boolean | DenoLintRulePreferRegExpFlagUnicodeOptions;
	/**
	 * Prefer curly braces around statement blocks.
	 * @default {true}
	 */
	"prefer-statement-block"?: boolean;
	/**
	 * Prefer `Symbol` to have a description.
	 * @default {false}
	 */
	"prefer-symbol-description"?: boolean;
	/**
	 * Enforce import Deno Standard Library (std) via JSR.
	 * @default {true}
	 */
	"std-on-jsr"?: boolean;
}
export function configureDenoLintPlugin(options: DenoLintRulesOptions = {}): Deno.lint.Plugin {
	const result: Record<string, Deno.lint.Rule> = {};
	for (const {
		context,
		identifier,
		recommended = false
	} of rules) {
		//@ts-ignore Lazy type.
		const option: unknown = options[identifier];
		if (typeof option === "boolean") {
			if (option) {
				result[identifier] = context();
			}
		} else if (typeof option === "undefined") {
			if (recommended) {
				result[identifier] = context();
			}
		} else {
			result[identifier] = context(option as unknown);
		}
	}
	return constructDenoLintPlugin(result);
}
