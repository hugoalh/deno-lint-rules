import {
	ruleData as ruleMaxComplexity,
	type RuleMaxComplexityOptions
} from "./_rules/max_complexity.ts";
import {
	ruleData as ruleMaxFileSize,
	type RuleMaxFileSizeOptions
} from "./_rules/max_file_size.ts";
import {
	ruleData as ruleMaxNestTernary,
	type RuleMaxNestTernaryOptions
} from "./_rules/max_nest_ternary.ts";
import {
	ruleData as ruleMaxParams,
	type RuleMaxParamsOptions
} from "./_rules/max_params.ts";
import { ruleData as ruleNoAlert } from "./_rules/no_alert.ts";
import { ruleData as ruleNoCharacterAmbiguous } from "./_rules/no_character_ambiguous.ts";
import { ruleData as ruleNoCharacterInvisible } from "./_rules/no_character_invisible.ts";
import { ruleData as ruleNoClassConstructorReturn } from "./_rules/no_class_constructor_return.ts";
import { ruleData as ruleNoConfirm } from "./_rules/no_confirm.ts";
import { ruleData as ruleNoDecorator } from "./_rules/no_decorator.ts";
import { ruleData as ruleNoDelete } from "./_rules/no_delete.ts";
import { ruleData as ruleNoDuplicateAwaits } from "./_rules/no_duplicate_awaits.ts";
import { ruleData as ruleNoDuplicateExportSources } from "./_rules/no_duplicate_export_sources.ts";
import { ruleData as ruleNoDuplicateImportIdentifiers } from "./_rules/no_duplicate_import_identifiers.ts";
import { ruleData as ruleNoDuplicateImportSources } from "./_rules/no_duplicate_import_sources.ts";
import { ruleData as ruleNoDuplicateInterfaceContexts } from "./_rules/no_duplicate_interface_contexts.ts";
import { ruleData as ruleNoDuplicateSetTypes } from "./_rules/no_duplicate_set_types.ts";
import { ruleData as ruleNoDuplicateTypeContexts } from "./_rules/no_duplicate_type_contexts.ts";
import { ruleData as ruleNoDuplicateTypeOfs } from "./_rules/no_duplicate_typeofs.ts";
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
	type RuleNoImportJSROptions
} from "./_rules/no_import_jsr.ts";
import { ruleData as ruleNoImportNodeNonFunctional } from "./_rules/no_import_node_non_functional.ts";
import { ruleData as ruleNoImportNode } from "./_rules/no_import_node.ts";
import {
	ruleData as ruleNoImportNPM,
	type RuleNoImportNPMOptions
} from "./_rules/no_import_npm.ts";
import { ruleData as ruleNoImportSelf } from "./_rules/no_import_self.ts";
import { ruleData as ruleNoIrregularNumericBaseCase } from "./_rules/no_irregular_numeric_base_case.ts";
import { ruleData as ruleNoIrregularNumericExponentCase } from "./_rules/no_irregular_numeric_exponent_case.ts";
import { ruleData as ruleNoIrregularNumericSeparation } from "./_rules/no_irregular_numeric_separation.ts";
import { ruleData as ruleNoMisuseFor } from "./_rules/no_misuse_for.ts";
import { ruleData as ruleNoMisuseSwitch } from "./_rules/no_misuse_switch.ts";
import { ruleData as ruleNoModifierPrivate } from "./_rules/no_modifier_private.ts";
import { ruleData as ruleNoModifierPublic } from "./_rules/no_modifier_public.ts";
import { ruleData as ruleNoNaN } from "./_rules/no_nan.ts";
import { ruleData as ruleNoPrompt } from "./_rules/no_prompt.ts";
import { ruleData as ruleNoSequenceAssignment } from "./_rules/no_sequence_assignment.ts";
import { ruleData as ruleNoSplitInterface } from "./_rules/no_split_interface.ts";
import { ruleData as ruleNoTypeAssertionAngleBracket } from "./_rules/no_type_assertion_angle_bracket.ts";
import { ruleData as ruleNoUnsafeNumber } from "./_rules/no_unsafe_number.ts";
import { ruleData as ruleNoUseStrict } from "./_rules/no_use_strict.ts";
import { ruleData as ruleNoUselessBlock } from "./_rules/no_useless_block.ts";
import { ruleData as ruleNoUselessClassConstructor } from "./_rules/no_useless_class_constructor.ts";
import { ruleData as ruleNoUselessClassStaticBlock } from "./_rules/no_useless_class_static_block.ts";
import { ruleData as ruleNoUselessContinue } from "./_rules/no_useless_continue.ts";
import { ruleData as ruleNoUselessElse } from "./_rules/no_useless_else.ts";
import { ruleData as ruleNoUselessExport } from "./_rules/no_useless_export.ts";
import { ruleData as ruleNoUselessExpression } from "./_rules/no_useless_expression.ts";
import { ruleData as ruleNoUselessSwitch } from "./_rules/no_useless_switch.ts";
import { ruleData as ruleNoUselessTemplateStringExpression } from "./_rules/no_useless_template_string_expression.ts";
import { ruleData as ruleNoUselessTemplateString } from "./_rules/no_useless_template_string.ts";
import { ruleData as ruleNoUselessTernary } from "./_rules/no_useless_ternary.ts";
import { ruleData as ruleNoUselessTry } from "./_rules/no_useless_try.ts";
import { ruleData as ruleNoUselessType } from "./_rules/no_useless_type.ts";
import { ruleData as ruleNoUsing } from "./_rules/no_using.ts";
import { ruleData as ruleNoVoid } from "./_rules/no_void.ts";
import { ruleData as rulePreferASCIIIdentifier } from "./_rules/prefer_ascii_identifier.ts";
import {
	ruleData as rulePreferHexCase,
	type RulePreferHexCaseOptions
} from "./_rules/prefer_hex_case.ts";
import { ruleData as rulePreferImportAtBegin } from "./_rules/prefer_import_at_begin.ts";
import { ruleData as rulePreferInterface } from "./_rules/prefer_interface.ts";
import {
	ruleData as rulePreferRegExpFlagUnicode,
	type RulePreferRegExpFlagUnicodeOptions
} from "./_rules/prefer_regexp_flag_unicode.ts";
import { ruleData as rulePreferStatementBlock } from "./_rules/prefer_statement_block.ts";
import { ruleData as rulePreferSymbolDescription } from "./_rules/prefer_symbol_description.ts";
import { ruleData as ruleStdOnJSR } from "./_rules/std_on_jsr.ts";
import {
	constructPlugin,
	type RuleData,
	type RuleSet
} from "./_utility.ts";
export type {
	RuleMaxComplexityOptions,
	RuleMaxFileSizeOptions,
	RuleMaxNestTernaryOptions,
	RuleMaxParamsOptions,
	RuleNoImportJSROptions,
	RuleNoImportNPMOptions,
	RulePreferHexCaseOptions,
	RulePreferRegExpFlagUnicodeOptions
};
//deno-lint-ignore no-explicit-any
const rules: readonly RuleData<any>[] = [
	ruleMaxComplexity,
	ruleMaxFileSize,
	ruleMaxNestTernary,
	ruleMaxParams,
	ruleNoAlert,
	ruleNoCharacterAmbiguous,
	ruleNoCharacterInvisible,
	ruleNoClassConstructorReturn,
	ruleNoConfirm,
	ruleNoDecorator,
	ruleNoDelete,
	ruleNoDuplicateAwaits,
	ruleNoDuplicateExportSources,
	ruleNoDuplicateImportIdentifiers,
	ruleNoDuplicateImportSources,
	ruleNoDuplicateInterfaceContexts,
	ruleNoDuplicateSetTypes,
	ruleNoDuplicateTypeContexts,
	ruleNoDuplicateTypeOfs,
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
	ruleNoImportNodeNonFunctional,
	ruleNoImportNode,
	ruleNoImportNPM,
	ruleNoImportSelf,
	ruleNoIrregularNumericBaseCase,
	ruleNoIrregularNumericExponentCase,
	ruleNoIrregularNumericSeparation,
	ruleNoMisuseFor,
	ruleNoMisuseSwitch,
	ruleNoModifierPrivate,
	ruleNoModifierPublic,
	ruleNoNaN,
	ruleNoPrompt,
	ruleNoSequenceAssignment,
	ruleNoSplitInterface,
	ruleNoTypeAssertionAngleBracket,
	ruleNoUnsafeNumber,
	ruleNoUseStrict,
	ruleNoUselessBlock,
	ruleNoUselessClassConstructor,
	ruleNoUselessClassStaticBlock,
	ruleNoUselessContinue,
	ruleNoUselessElse,
	ruleNoUselessExport,
	ruleNoUselessExpression,
	ruleNoUselessSwitch,
	ruleNoUselessTemplateStringExpression,
	ruleNoUselessTemplateString,
	ruleNoUselessTernary,
	ruleNoUselessTry,
	ruleNoUselessType,
	ruleNoUsing,
	ruleNoVoid,
	rulePreferASCIIIdentifier,
	rulePreferHexCase,
	rulePreferImportAtBegin,
	rulePreferInterface,
	rulePreferRegExpFlagUnicode,
	rulePreferStatementBlock,
	rulePreferSymbolDescription,
	ruleStdOnJSR
];
for (const { identifier: identifierCurrent } of rules) {
	if (rules.filter(({ identifier: identifierCompare }: RuleData<unknown>): boolean => {
		return (identifierCompare === identifierCurrent);
	}).length > 1) {
		throw new Error(`Found duplicated rule identifier \`${identifierCurrent}\`! Please submit a bug report.`);
	}
}
export interface RulesOptions {
	/**
	 * Restrict maximum complexity of the code.
	 * @default {false}
	 */
	"max-complexity"?: boolean | RuleMaxComplexityOptions;
	/**
	 * Restrict maximum size of the file.
	 * @default {false}
	 */
	"max-file-size"?: boolean | RuleMaxFileSizeOptions;
	/**
	 * Restrict maximum nest of the ternaries.
	 * @default {false}
	 */
	"max-nest-ternary"?: boolean | RuleMaxNestTernaryOptions;
	/**
	 * Restrict maximum number of parameters per function/method definition.
	 * @default {false}
	 */
	"max-params"?: boolean | RuleMaxParamsOptions;
	/**
	 * Forbid use of `alert`.
	 * @default {false}
	 */
	"no-alert"?: boolean;
	/**
	 * Forbid character which is ambiguous.
	 * @default {false}
	 */
	"no-character-ambiguous"?: boolean;
	/**
	 * Forbid character which is invisible.
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
	 * Forbid use of decorator.
	 * @default {false}
	 */
	"no-decorator"?: boolean;
	/**
	 * Forbid use of `delete`.
	 * @default {false}
	 */
	"no-delete"?: boolean;
	/**
	 * Forbid duplicate `await`s.
	 * @default {true}
	 */
	"no-duplicate-awaits"?: boolean;
	/**
	 * Forbid duplicate `export` sources.
	 * @default {true}
	 */
	"no-duplicate-export-sources"?: boolean;
	/**
	 * Forbid duplicate `import` identifiers.
	 * @default {true}
	 */
	"no-duplicate-import-identifiers"?: boolean;
	/**
	 * Forbid duplicate `import` sources.
	 * @default {true}
	 */
	"no-duplicate-import-sources"?: boolean;
	/**
	 * Forbid duplicate `interface` contexts.
	 * @default {true}
	 */
	"no-duplicate-interface-contexts"?: boolean;
	/**
	 * Forbid duplicate types when intersection or union.
	 * @default {true}
	 */
	"no-duplicate-set-types"?: boolean;
	/**
	 * Forbid duplicate `type` contexts.
	 * @default {true}
	 */
	"no-duplicate-type-contexts"?: boolean;
	/**
	 * Forbid duplicate `typeof`s.
	 * @default {true}
	 */
	"no-duplicate-typeofs"?: boolean;
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
	"no-import-jsr"?: boolean | RuleNoImportJSROptions;
	/**
	 * Forbid import non functional NodeJS module in Deno.
	 * @default {true}
	 */
	"no-import-node-non-functional"?: boolean;
	/**
	 * Forbid import module via protocol `node:`.
	 * @default {false}
	 */
	"no-import-node"?: boolean;
	/**
	 * Forbid import NPM module.
	 * @default {false}
	 */
	"no-import-npm"?: boolean | RuleNoImportNPMOptions;
	/**
	 * Forbid the module import itself.
	 * @default {true}
	 */
	"no-import-self"?: boolean;
	/**
	 * Forbid irregular numeric base case.
	 * @default {true}
	 */
	"no-irregular-numeric-base-case"?: boolean;
	/**
	 * Forbid irregular numeric exponent case.
	 * @default {true}
	 */
	"no-irregular-numeric-exponent-case"?: boolean;
	/**
	 * Forbid irregular numeric separation.
	 * @default {true}
	 */
	"no-irregular-numeric-separation"?: boolean;
	/**
	 * Forbid misuse `for` statement.
	 * @default {true}
	 */
	"no-misuse-for"?: boolean;
	/**
	 * Forbid misuse `switch` statement.
	 * @default {true}
	 */
	"no-misuse-switch"?: boolean;
	/**
	 * Forbid use of modifier `private`.
	 * @default {true}
	 */
	"no-modifier-private"?: boolean;
	/**
	 * Forbid use of modifier `public`.
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
	 * Forbid sequence assignments and variables declaration.
	 * @default {false}
	 */
	"no-sequence-assignment"?: boolean;
	/**
	 * Forbid split `interface` with same identifier.
	 * @default {true}
	 */
	"no-split-interface"?: boolean;
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
	 * Forbid useless expression in the template string.
	 * @default {true}
	 */
	"no-useless-template-string-expression"?: boolean;
	/**
	 * Forbid useless template string.
	 * @default {false}
	 */
	"no-useless-template-string"?: boolean;
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
	 * Forbid use of `using` and `await using`.
	 * @default {false}
	 */
	"no-using"?: boolean;
	/**
	 * Forbid use of `void`.
	 * @default {false}
	 */
	"no-void"?: boolean;
	/**
	 * Prefer ASCII identifier, an alternative of the Deno lint rule `prefer-ascii` which only enforce on the identifier.
	 * @default {true}
	 */
	"prefer-ascii-identifier"?: boolean;
	/**
	 * Prefer hex case.
	 * @default {true}
	 */
	"prefer-hex-case"?: boolean | RulePreferHexCaseOptions;
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
	"prefer-regexp-flag-unicode"?: boolean | RulePreferRegExpFlagUnicodeOptions;
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
export interface PluginOptions {
	/**
	 * Rule sets to use.
	 * 
	 * To disable rule sets, define this with empty array (`[]`).
	 * @default {["recommended"]}
	 */
	sets?: readonly RuleSet[];
	/**
	 * Rule options.
	 */
	rules?: RulesOptions;
}
export function configurePlugin(options: PluginOptions = {}): Deno.lint.Plugin {
	const {
		rules: rulesOptions = {},
		sets: setsOptions = ["recommended"]
	}: PluginOptions = options;
	const result: Record<string, Deno.lint.Rule> = {};

	// By rules options.
	for (const [
		ruleOptionsIdentifier,
		ruleOptionsValue
	] of Object.entries(rulesOptions)) {
		//deno-lint-ignore no-explicit-any
		const ruleFound: RuleData<any> | undefined = rules.find(({ identifier }: RuleData<any>): boolean => {
			return (ruleOptionsIdentifier === identifier);
		});
		if (typeof ruleFound !== "undefined" && typeof ruleOptionsValue !== "undefined") {
			if (typeof ruleOptionsValue === "boolean") {
				if (ruleOptionsValue) {
					result[ruleFound.identifier] = ruleFound.context();
				}
			} else {
				result[ruleFound.identifier] = ruleFound.context(ruleOptionsValue);
			}
		}
	}

	// By sets options.
	if (setsOptions.length > 0) {
		for (const rule of rules) {
			if (typeof result[rule.identifier] === "undefined" && rulesOptions[rule.identifier as keyof RulesOptions] !== false && (
				setsOptions.includes("all") ||
				(rule.sets ?? []).filter((set: RuleSet): boolean => {
					return setsOptions.includes(set);
				}).length > 0
			)) {
				result[rule.identifier] = rule.context();
			}
		}
	}
	return constructPlugin(result);
}
export default configurePlugin;
