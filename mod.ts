import {
	ruleData as ruleMaxComplexity,
	type DenoLintRuleMaxComplexityOptions
} from "./_rules/max_complexity.ts";
import {
	ruleData as ruleMaxFileSize,
	type DenoLintRuleMaxSizeOptions
} from "./_rules/max_file_size.ts";
import {
	ruleData as ruleMaxParams,
	type DenoLintRuleMaxParamsOptions
} from "./_rules/max_params.ts";
import { ruleData as ruleNoAlert } from "./_rules/no_alert.ts";
import { ruleData as ruleNoCharacterAmbiguous } from "./_rules/no_character_ambiguous.ts";
import { ruleData as ruleNoCharacterInvisible } from "./_rules/no_character_invisible.ts";
import { ruleData as ruleNoClassConstructorReturn } from "./_rules/no_class_constructor_return.ts";
import { ruleData as ruleNoConfirm } from "./_rules/no_confirm.ts";
import { ruleData as ruleNoDuplicateAwaits } from "./_rules/no_duplicate_awaits.ts";
import { ruleData as ruleNoDuplicateImports } from "./_rules/no_duplicate_imports.ts";
import { ruleData as ruleNoDuplicateInterfaces } from "./_rules/no_duplicate_interfaces.ts";
import { ruleData as ruleNoDuplicateSetTypes } from "./_rules/no_duplicate_set_types.ts";
import { ruleData as ruleNoDuplicateTypeOfs } from "./_rules/no_duplicate_typeofs.ts";
import { ruleData as ruleNoDuplicateTypes } from "./_rules/no_duplicate_types.ts";
import { ruleData as ruleNoDuplicateVoids } from "./_rules/no_duplicate_voids.ts";
import { ruleData as ruleNoEmptyYield } from "./_rules/no_empty_yield.ts";
import { ruleData as ruleNoEnum } from "./_rules/no_enum.ts";
import { ruleData as ruleNoIIFE } from "./_rules/no_iife.ts";
import { ruleData as ruleNoImportAbsolute } from "./_rules/no_import_absolute.ts";
import { ruleData as ruleNoImportData } from "./_rules/no_import_data.ts";
import { ruleData as ruleNoImportDynamic } from "./_rules/no_import_dynamic.ts";
import { ruleData as ruleNoImportFile } from "./_rules/no_import_file.ts";
import { ruleData as ruleNoImportHTTP } from "./_rules/no_import_http.ts";
import { ruleData as ruleNoImportHTTPS } from "./_rules/no_import_https.ts";
import {
	ruleData as ruleNoImportJSR,
	type DenoLintRuleNoImportJSROptions
} from "./_rules/no_import_jsr.ts";
import { ruleData as ruleNoImportNode } from "./_rules/no_import_node.ts";
import {
	ruleData as ruleNoImportNPM,
	type DenoLintRuleNoImportNPMOptions
} from "./_rules/no_import_npm.ts";
import { ruleData as ruleNoImportSelf } from "./_rules/no_import_self.ts";
import { ruleData as ruleNoModifierPrivate } from "./_rules/no_modifier_private.ts";
import { ruleData as ruleNoModifierPublic } from "./_rules/no_modifier_public.ts";
import { ruleData as ruleNoNaN } from "./_rules/no_nan.ts";
import { ruleData as ruleNoPrompt } from "./_rules/no_prompt.ts";
import { ruleData as ruleNoTernaryNest } from "./_rules/no_ternary_nest.ts";
import { ruleData as ruleNoTypeAssertionAngleBracket } from "./_rules/no_type_assertion_angle_bracket.ts";
import { ruleData as ruleNoUnsafeNumber } from "./_rules/no_unsafe_number.ts";
import { ruleData as ruleNoUselessBlock } from "./_rules/no_useless_block.ts";
import { ruleData as ruleNoUselessClassConstructor } from "./_rules/no_useless_class_constructor.ts";
import { ruleData as ruleNoUselessClassStaticBlock } from "./_rules/no_useless_class_static_block.ts";
import { ruleData as ruleNoUselessContinue } from "./_rules/no_useless_continue.ts";
import { ruleData as ruleNoUselessElse } from "./_rules/no_useless_else.ts";
import { ruleData as ruleNoUselessExport } from "./_rules/no_useless_export.ts";
import { ruleData as ruleNoUselessExpression } from "./_rules/no_useless_expression.ts";
import { ruleData as ruleNoUselessSwitch } from "./_rules/no_useless_switch.ts";
import { ruleData as ruleNoUselessTernary } from "./_rules/no_useless_ternary.ts";
import { ruleData as ruleNoUselessTry } from "./_rules/no_useless_try.ts";
import { ruleData as ruleNoUselessType } from "./_rules/no_useless_type.ts";
import { ruleData as ruleNoUseStrict } from "./_rules/no_use_strict.ts";
import { ruleData as rulePreferASCIIIdentifier } from "./_rules/prefer_ascii_identifier.ts";
import { ruleData as rulePreferImportAtBegin } from "./_rules/prefer_import_at_begin.ts";
import { ruleData as rulePreferInterface } from "./_rules/prefer_interface.ts";
import {
	ruleData as rulePreferRegExpFlagUnicode,
	type DenoLintRulePreferRegExpFlagUnicodeOptions
} from "./_rules/prefer_regexp_flag_unicode.ts";
import { ruleData as rulePreferStatementBlock } from "./_rules/prefer_statement_block.ts";
import { ruleData as rulePreferSymbolDescription } from "./_rules/prefer_symbol_description.ts";
import { ruleData as ruleStdOnJSR } from "./_rules/std_on_jsr.ts";
import {
	constructDenoLintPlugin,
	type DenoLintRuleData
} from "./_utility.ts";
//deno-lint-ignore no-explicit-any
const rules: readonly DenoLintRuleData<any>[] = [
	ruleMaxComplexity,
	ruleMaxFileSize,
	ruleMaxParams,
	ruleNoAlert,
	ruleNoCharacterAmbiguous,
	ruleNoCharacterInvisible,
	ruleNoClassConstructorReturn,
	ruleNoConfirm,
	ruleNoDuplicateAwaits,
	ruleNoDuplicateImports,
	ruleNoDuplicateInterfaces,
	ruleNoDuplicateSetTypes,
	ruleNoDuplicateTypeOfs,
	ruleNoDuplicateTypes,
	ruleNoDuplicateVoids,
	ruleNoEmptyYield,
	ruleNoEnum,
	ruleNoIIFE,
	ruleNoImportAbsolute,
	ruleNoImportData,
	ruleNoImportDynamic,
	ruleNoImportFile,
	ruleNoImportHTTP,
	ruleNoImportHTTPS,
	ruleNoImportJSR,
	ruleNoImportNode,
	ruleNoImportNPM,
	ruleNoImportSelf,
	ruleNoModifierPrivate,
	ruleNoModifierPublic,
	ruleNoNaN,
	ruleNoPrompt,
	ruleNoTernaryNest,
	ruleNoTypeAssertionAngleBracket,
	ruleNoUnsafeNumber,
	ruleNoUselessBlock,
	ruleNoUselessClassConstructor,
	ruleNoUselessClassStaticBlock,
	ruleNoUselessContinue,
	ruleNoUselessElse,
	ruleNoUselessExport,
	ruleNoUselessExpression,
	ruleNoUselessSwitch,
	ruleNoUselessTernary,
	ruleNoUselessTry,
	ruleNoUselessType,
	ruleNoUseStrict,
	rulePreferASCIIIdentifier,
	rulePreferImportAtBegin,
	rulePreferInterface,
	rulePreferRegExpFlagUnicode,
	rulePreferStatementBlock,
	rulePreferSymbolDescription,
	ruleStdOnJSR
];
//deno-lint-ignore no-explicit-any
const rulesIdentifier: readonly string[] = rules.map(({ identifier }: DenoLintRuleData<any>): string => {
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
	 * Restrict maximum complexity of the code.
	 * @default {false}
	 */
	"max-complexity"?: boolean | DenoLintRuleMaxComplexityOptions;
	/**
	 * Restrict maximum size of the file.
	 * @default {false}
	 */
	"max-file-size"?: boolean | DenoLintRuleMaxSizeOptions;
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
	 * @default {false}
	 */
	"no-character-ambiguous"?: boolean;
	/**
	 * @default {false}
	 */
	"no-character-invisible"?: boolean;
	/**
	 * Forbid return value in the class constructor.
	 * @default {true}
	 */
	"no-class-constructor-return"?: boolean;
	/**
	 * Forbid use of `confirm`.
	 * @default {false}
	 */
	"no-confirm"?: boolean;
	/**
	 * Forbid duplicate `await`s.
	 * @default {true}
	 */
	"no-duplicate-awaits"?: boolean;
	/**
	 * Forbid duplicate `import`s.
	 * @default {true}
	 */
	"no-duplicate-imports"?: boolean;
	/**
	 * Forbid duplicate `interface`s.
	 * @default {true}
	 */
	"no-duplicate-interfaces"?: boolean;
	/**
	 * Forbid duplicate types when intersection or union.
	 * @default {true}
	 */
	"no-duplicate-set-types"?: boolean;
	/**
	 * Forbid duplicate `typeof` operators.
	 * @default {true}
	 */
	"no-duplicate-typeofs"?: boolean;
	/**
	 * Forbid duplicate `type`s.
	 * @default {true}
	 */
	"no-duplicate-types"?: boolean;
	/**
	 * Forbid duplicate `void`s.
	 * @default {true}
	 */
	"no-duplicate-voids"?: boolean;
	/**
	 * Forbid empty `yield`.
	 * @default {true}
	 */
	"no-empty-yield"?: boolean;
	/**
	 * Forbid use of `enum`.
	 * @default {true}
	 */
	"no-enum"?: boolean;
	/**
	 * Forbid use of immediately invoked function expression (IIFE).
	 * @default {false}
	 */
	"no-iife"?: boolean;
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
	 * Forbid import module dynamically.
	 * @default {false}
	 */
	"no-import-dynamic"?: boolean;
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
	 * Forbid import JSR module. Default to only forbid import JSR module via URL.
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
	 * Forbid modifier `private`.
	 * @default {true}
	 */
	"no-modifier-private"?: boolean;
	/**
	 * Forbid modifier `public`.
	 * @default {true}
	 */
	"no-modifier-public"?: boolean;
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
	 * Forbid type assertion with angle bracket syntax.
	 * @default {true}
	 */
	"no-type-assertion-angle-bracket"?: boolean;
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
	 * Forbid useless `else` statement.
	 * @default {true}
	 */
	"no-useless-else"?: boolean;
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
	 * Forbid useless `try` statement.
	 * @default {true}
	 */
	"no-useless-try"?: boolean;
	/**
	 * Forbid useless `type`.
	 * @default {true}
	 */
	"no-useless-type"?: boolean;
	/**
	 * Prefer ASCII identifier, an alternative of the Deno lint rule `prefer-ascii` which only enforce on the identifier.
	 * @default {true}
	 */
	"prefer-ascii-identifier"?: boolean;
	/**
	 * Prefer `import` statements at the begin of the module/script.
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
	 * Prefer the body of the statement is in block (i.e.: surrounded by curly braces).
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
export interface DenoLintRulesPluginOptions {
	/**
	 * Whether to include recommended rules.
	 * @default {true}
	 */
	includeRecommended?: boolean;
}
export function configureDenoLintPlugin(rulesOptions: DenoLintRulesOptions = {}, pluginOptions: DenoLintRulesPluginOptions = {}): Deno.lint.Plugin {
	const { includeRecommended = true }: DenoLintRulesPluginOptions = pluginOptions;
	const result: Record<string, Deno.lint.Rule> = {};
	for (const {
		context,
		identifier,
		recommended = false
	} of rules) {
		//@ts-ignore Lazy type.
		const option: unknown = rulesOptions[identifier];
		if (typeof option === "boolean") {
			if (option) {
				result[identifier] = context();
			}
		} else if (typeof option === "undefined") {
			if (includeRecommended && recommended) {
				result[identifier] = context();
			}
		} else {
			result[identifier] = context(option as unknown);
		}
	}
	return constructDenoLintPlugin(result);
}
export default configureDenoLintPlugin;
