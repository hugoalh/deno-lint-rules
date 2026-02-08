import { ruleData as ruleASCIIIdentifier } from "./_rules/ascii_identifier.ts";
import { ruleData as ruleCurlyArrowFunction } from "./_rules/curly_arrow_function.ts";
import { ruleData as ruleCurlyDoWhile } from "./_rules/curly_do_while.ts";
import { ruleData as ruleCurlyElse } from "./_rules/curly_else.ts";
import { ruleData as ruleCurlyForIn } from "./_rules/curly_for_in.ts";
import { ruleData as ruleCurlyForOf } from "./_rules/curly_for_of.ts";
import { ruleData as ruleCurlyFor } from "./_rules/curly_for.ts";
import { ruleData as ruleCurlyIf } from "./_rules/curly_if.ts";
import { ruleData as ruleCurlyWhile } from "./_rules/curly_while.ts";
import { ruleData as ruleCurlyWith } from "./_rules/curly_with.ts";
import { ruleData as ruleDenoCoverageIgnoreFileReason } from "./_rules/deno_coverage_ignore_file_reason.ts";
import { ruleData as ruleDenoCoverageIgnoreLineReason } from "./_rules/deno_coverage_ignore_line_reason.ts";
import { ruleData as ruleDenoCoverageIgnoreStartReason } from "./_rules/deno_coverage_ignore_start_reason.ts";
import { ruleData as ruleDenoFmtIgnoreFileReason } from "./_rules/deno_fmt_ignore_file_reason.ts";
import { ruleData as ruleDenoFmtIgnoreLineReason } from "./_rules/deno_fmt_ignore_line_reason.ts";
import { ruleData as ruleDenoLintIgnoreFileReason } from "./_rules/deno_lint_ignore_file_reason.ts";
import { ruleData as ruleDenoLintIgnoreLineReason } from "./_rules/deno_lint_ignore_line_reason.ts";
import {
	ruleData as ruleFmtHexCase,
	type RuleFmtHexCaseOptions
} from "./_rules/fmt_hex_case.ts";
import { ruleData as ruleFmtJSDoc } from "./_rules/fmt_jsdoc.ts";
import { ruleData as ruleFmtNumericBaseCase } from "./_rules/fmt_numeric_base_case.ts";
import { ruleData as ruleFmtNumericExponentCase } from "./_rules/fmt_numeric_exponent_case.ts";
import {
	ruleData as ruleFmtNumericExponentSign,
	type RuleFmtNumericExponentSignOptions
} from "./_rules/fmt_numeric_exponent_sign.ts";
import {
	ruleData as ruleFmtNumericSeparation,
	type RuleFmtNumericSeparationOptions
} from "./_rules/fmt_numeric_separation.ts";
import { ruleData as ruleImportAtStart } from "./_rules/import_at_start.ts";
import { ruleData as ruleJSDocDeprecatedReason } from "./_rules/jsdoc_deprecated_reason.ts";
import {
	ruleData as ruleMaxComplexity,
	type RuleMaxComplexityOptions
} from "./_rules/max_complexity.ts";
import {
	ruleData as ruleMaxFileLines,
	type RuleMaxFileLinesOptions
} from "./_rules/max_file_lines.ts";
import {
	ruleData as ruleMaxFileSize,
	type RuleMaxFileSizeOptions
} from "./_rules/max_file_size.ts";
import {
	ruleData as ruleMaxIdentifierLength,
	type RuleMaxIdentifierLengthOptions
} from "./_rules/max_identifier_length.ts";
import {
	ruleData as ruleMaxNestTernaries,
	type RuleMaxNestTernariesOptions
} from "./_rules/max_nest_ternaries.ts";
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
import { ruleData as ruleNoDenoTypes } from "./_rules/no_deno_types.ts";
import { ruleData as ruleNoDeno } from "./_rules/no_deno.ts";
import { ruleData as ruleNoDependFromAbsolute } from "./_rules/no_depend_from_absolute.ts";
import { ruleData as ruleNoDependFromData } from "./_rules/no_depend_from_data.ts";
import { ruleData as ruleNoDependFromDLMR } from "./_rules/no_depend_from_dlmr.ts";
import { ruleData as ruleNoDependFromFile } from "./_rules/no_depend_from_file.ts";
import { ruleData as ruleNoDependFromHTTP } from "./_rules/no_depend_from_http.ts";
import { ruleData as ruleNoDependFromHTTPS } from "./_rules/no_depend_from_https.ts";
import { ruleData as ruleNoDependFromJSRProtocol } from "./_rules/no_depend_from_jsr_protocol.ts";
import { ruleData as ruleNoDependFromJSRURL } from "./_rules/no_depend_from_jsr_url.ts";
import { ruleData as ruleNoDependFromNodeNonFunctional } from "./_rules/no_depend_from_node_non_functional.ts";
import { ruleData as ruleNoDependFromNode } from "./_rules/no_depend_from_node.ts";
import { ruleData as ruleNoDependFromNPMProtocol } from "./_rules/no_depend_from_npm_protocol.ts";
import { ruleData as ruleNoDependFromNPMURL } from "./_rules/no_depend_from_npm_url.ts";
import { ruleData as ruleNoDependFromSelf } from "./_rules/no_depend_from_self.ts";
import { ruleData as ruleNoDependTypeBytes } from "./_rules/no_depend_type_bytes.ts";
import { ruleData as ruleNoDependTypeJSON } from "./_rules/no_depend_type_json.ts";
import { ruleData as ruleNoDependTypeText } from "./_rules/no_depend_type_text.ts";
import { ruleData as ruleNoDependTypeWASM } from "./_rules/no_depend_type_wasm.ts";
import { ruleData as ruleNoDuplicateAwaits } from "./_rules/no_duplicate_awaits.ts";
import { ruleData as ruleNoDuplicateExportSources } from "./_rules/no_duplicate_export_sources.ts";
import { ruleData as ruleNoDuplicateImportIdentifiers } from "./_rules/no_duplicate_import_identifiers.ts";
import { ruleData as ruleNoDuplicateImportSources } from "./_rules/no_duplicate_import_sources.ts";
import { ruleData as ruleNoDuplicateInterfaces } from "./_rules/no_duplicate_interfaces.ts";
import { ruleData as ruleNoDuplicateSetTypes } from "./_rules/no_duplicate_set_types.ts";
import { ruleData as ruleNoDuplicateTypeOfs } from "./_rules/no_duplicate_typeofs.ts";
import { ruleData as ruleNoDuplicateTypes } from "./_rules/no_duplicate_types.ts";
import { ruleData as ruleNoDuplicateVoids } from "./_rules/no_duplicate_voids.ts";
import { ruleData as ruleNoEmptyCommentBlock } from "./_rules/no_empty_comment_block.ts";
import { ruleData as ruleNoEmptyCommentLine } from "./_rules/no_empty_comment_line.ts";
import { ruleData as ruleNoEmptyJSDoc } from "./_rules/no_empty_jsdoc.ts";
import { ruleData as ruleNoEmptyYield } from "./_rules/no_empty_yield.ts";
import { ruleData as ruleNoEnumMixValueType } from "./_rules/no_enum_mix_value_type.ts";
import { ruleData as ruleNoEnum } from "./_rules/no_enum.ts";
import { ruleData as ruleNoExportDepend } from "./_rules/no_export_depend.ts";
import { ruleData as ruleNoFloatDotLone } from "./_rules/no_float_dot_lone.ts";
import { ruleData as ruleNoFloatDotStart } from "./_rules/no_float_dot_start.ts";
import { ruleData as ruleNoIIFE } from "./_rules/no_iife.ts";
import { ruleData as ruleNoImportDynamic } from "./_rules/no_import_dynamic.ts";
import { ruleData as ruleNoImportSource } from "./_rules/no_import_source.ts";
import { ruleData as ruleNoMisuseFor } from "./_rules/no_misuse_for.ts";
import { ruleData as ruleNoMisuseSwitch } from "./_rules/no_misuse_switch.ts";
import { ruleData as ruleNoModifierPrivate } from "./_rules/no_modifier_private.ts";
import { ruleData as ruleNoModifierPublic } from "./_rules/no_modifier_public.ts";
import { ruleData as ruleNoNaN } from "./_rules/no_nan.ts";
import { ruleData as ruleNoPrompt } from "./_rules/no_prompt.ts";
import { ruleData as ruleNoSequenceAssignment } from "./_rules/no_sequence_assignment.ts";
import { ruleData as ruleNoSplitInterface } from "./_rules/no_split_interface.ts";
import { ruleData as ruleNoTypeAssertionAngleBracket } from "./_rules/no_type_assertion_angle_bracket.ts";
import { ruleData as ruleNoTypeScriptInjectFeature } from "./_rules/no_typescript_inject_feature.ts";
import { ruleData as ruleNoUnknownJSDocTag } from "./_rules/no_unknown_jsdoc_tag.ts";
import { ruleData as ruleNoUnsafeNumber } from "./_rules/no_unsafe_number.ts";
import { ruleData as ruleNoUseStrict } from "./_rules/no_use_strict.ts";
import { ruleData as ruleNoUselessBlock } from "./_rules/no_useless_block.ts";
import { ruleData as ruleNoUselessCalculateStrings } from "./_rules/no_useless_calculate_strings.ts";
import { ruleData as ruleNoUselessCatch } from "./_rules/no_useless_catch.ts";
import { ruleData as ruleNoUselessContinue } from "./_rules/no_useless_continue.ts";
import { ruleData as ruleNoUselessElse } from "./_rules/no_useless_else.ts";
import { ruleData as ruleNoUselessExport } from "./_rules/no_useless_export.ts";
import { ruleData as ruleNoUselessExpression } from "./_rules/no_useless_expression.ts";
import { ruleData as ruleNoUselessNumericExponent } from "./_rules/no_useless_numeric_exponent.ts";
import { ruleData as ruleNoUselessSwitchCase } from "./_rules/no_useless_switch_case.ts";
import { ruleData as ruleNoUselessTemplateStringExpression } from "./_rules/no_useless_template_string_expression.ts";
import {
	ruleData as ruleNoUselessTemplateString,
	type RuleNoUselessTemplateStringOptions
} from "./_rules/no_useless_template_string.ts";
import { ruleData as ruleNoUselessTernary } from "./_rules/no_useless_ternary.ts";
import { ruleData as ruleNoUselessType } from "./_rules/no_useless_type.ts";
import { ruleData as ruleNoUsing } from "./_rules/no_using.ts";
import { ruleData as ruleNoVoid } from "./_rules/no_void.ts";
import { ruleData as rulePreferInterface } from "./_rules/prefer_interface.ts";
import { ruleData as ruleSymbolDescription } from "./_rules/symbol_description.ts";
import { ruleData as ruleUniqueArray } from "./_rules/unique_array.ts";
import {
	constructPlugin,
	type RuleData,
	type RuleTag
} from "./_utility.ts";
export type {
	RuleFmtHexCaseOptions,
	RuleFmtNumericExponentSignOptions,
	RuleFmtNumericSeparationOptions,
	RuleMaxComplexityOptions,
	RuleMaxFileLinesOptions,
	RuleMaxFileSizeOptions,
	RuleMaxIdentifierLengthOptions,
	RuleMaxNestTernariesOptions,
	RuleMaxParamsOptions,
	RuleNoUselessTemplateStringOptions
};
//deno-lint-ignore no-explicit-any -- Lazy
const rules: readonly RuleData<any>[] = /* UNIQUE */[
	ruleASCIIIdentifier,
	ruleCurlyArrowFunction,
	ruleCurlyDoWhile,
	ruleCurlyElse,
	ruleCurlyForIn,
	ruleCurlyForOf,
	ruleCurlyFor,
	ruleCurlyIf,
	ruleCurlyWhile,
	ruleCurlyWith,
	ruleDenoCoverageIgnoreFileReason,
	ruleDenoCoverageIgnoreLineReason,
	ruleDenoCoverageIgnoreStartReason,
	ruleDenoFmtIgnoreFileReason,
	ruleDenoFmtIgnoreLineReason,
	ruleDenoLintIgnoreFileReason,
	ruleDenoLintIgnoreLineReason,
	ruleFmtHexCase,
	ruleFmtJSDoc,
	ruleFmtNumericBaseCase,
	ruleFmtNumericExponentCase,
	ruleFmtNumericExponentSign,
	ruleFmtNumericSeparation,
	ruleImportAtStart,
	ruleJSDocDeprecatedReason,
	ruleMaxComplexity,
	ruleMaxFileLines,
	ruleMaxFileSize,
	ruleMaxIdentifierLength,
	ruleMaxNestTernaries,
	ruleMaxParams,
	ruleNoAlert,
	ruleNoCharacterAmbiguous,
	ruleNoCharacterInvisible,
	ruleNoClassConstructorReturn,
	ruleNoConfirm,
	ruleNoDecorator,
	ruleNoDelete,
	ruleNoDenoTypes,
	ruleNoDeno,
	ruleNoDependFromAbsolute,
	ruleNoDependFromData,
	ruleNoDependFromDLMR,
	ruleNoDependFromFile,
	ruleNoDependFromHTTP,
	ruleNoDependFromHTTPS,
	ruleNoDependFromJSRProtocol,
	ruleNoDependFromJSRURL,
	ruleNoDependFromNodeNonFunctional,
	ruleNoDependFromNode,
	ruleNoDependFromNPMProtocol,
	ruleNoDependFromNPMURL,
	ruleNoDependFromSelf,
	ruleNoDependTypeBytes,
	ruleNoDependTypeJSON,
	ruleNoDependTypeText,
	ruleNoDependTypeWASM,
	ruleNoDuplicateAwaits,
	ruleNoDuplicateExportSources,
	ruleNoDuplicateImportIdentifiers,
	ruleNoDuplicateImportSources,
	ruleNoDuplicateInterfaces,
	ruleNoDuplicateSetTypes,
	ruleNoDuplicateTypeOfs,
	ruleNoDuplicateTypes,
	ruleNoDuplicateVoids,
	ruleNoEmptyCommentBlock,
	ruleNoEmptyCommentLine,
	ruleNoEmptyJSDoc,
	ruleNoEmptyYield,
	ruleNoEnumMixValueType,
	ruleNoEnum,
	ruleNoExportDepend,
	ruleNoFloatDotLone,
	ruleNoFloatDotStart,
	ruleNoIIFE,
	ruleNoImportDynamic,
	ruleNoImportSource,
	ruleNoMisuseFor,
	ruleNoMisuseSwitch,
	ruleNoModifierPrivate,
	ruleNoModifierPublic,
	ruleNoNaN,
	ruleNoPrompt,
	ruleNoSequenceAssignment,
	ruleNoSplitInterface,
	ruleNoTypeAssertionAngleBracket,
	ruleNoTypeScriptInjectFeature,
	ruleNoUnknownJSDocTag,
	ruleNoUnsafeNumber,
	ruleNoUseStrict,
	ruleNoUselessBlock,
	ruleNoUselessCalculateStrings,
	ruleNoUselessCatch,
	ruleNoUselessContinue,
	ruleNoUselessElse,
	ruleNoUselessExport,
	ruleNoUselessExpression,
	ruleNoUselessNumericExponent,
	ruleNoUselessSwitchCase,
	ruleNoUselessTemplateStringExpression,
	ruleNoUselessTemplateString,
	ruleNoUselessTernary,
	ruleNoUselessType,
	ruleNoUsing,
	ruleNoVoid,
	rulePreferInterface,
	ruleSymbolDescription,
	ruleUniqueArray
];
export interface RulesOptions {
	/**
	 * Require the identifier contain only ASCII characters.
	 * @default {true}
	 */
	"ascii-identifier"?: boolean;
	/**
	 * Require the body of the arrow function expression is in block.
	 * @default {false}
	 */
	"curly-arrow-function"?: boolean;
	/**
	 * Require the body of the `do-while` statement is in block.
	 * @default {false}
	 */
	"curly-do-while"?: boolean;
	/**
	 * Require the body of the `else` statement is in block.
	 * @default {false}
	 */
	"curly-else"?: boolean;
	/**
	 * Require the body of the `for-in` statement is in block.
	 * @default {false}
	 */
	"curly-for-in"?: boolean;
	/**
	 * Require the body of the `for-of` statement is in block.
	 * @default {false}
	 */
	"curly-for-of"?: boolean;
	/**
	 * Require the body of the `for` statement is in block.
	 * @default {false}
	 */
	"curly-for"?: boolean;
	/**
	 * Require the body of the `if` statement is in block.
	 * @default {false}
	 */
	"curly-if"?: boolean;
	/**
	 * Require the body of the `while` statement is in block.
	 * @default {false}
	 */
	"curly-while"?: boolean;
	/**
	 * Require the body of the `with` statement is in block.
	 * @default {false}
	 */
	"curly-with"?: boolean;
	/**
	 * Require the Deno coverage ignore file directive have a reason.
	 * @default {false}
	 */
	"deno-coverage-ignore-file-reason"?: boolean;
	/**
	 * Require the Deno coverage ignore line directive have a reason.
	 * @default {false}
	 */
	"deno-coverage-ignore-line-reason"?: boolean;
	/**
	 * Require the Deno coverage ignore start directive have a reason.
	 * @default {false}
	 */
	"deno-coverage-ignore-start-reason"?: boolean;
	/**
	 * Require the Deno format ignore file directive have a reason.
	 * @default {false}
	 */
	"deno-fmt-ignore-file-reason"?: boolean;
	/**
	 * Require the Deno format ignore line directive have a reason.
	 * @default {false}
	 */
	"deno-fmt-ignore-line-reason"?: boolean;
	/**
	 * Require the Deno lint ignore file directive have a reason.
	 * @default {true}
	 */
	"deno-lint-ignore-file-reason"?: boolean;
	/**
	 * Require the Deno lint ignore line directive have a reason.
	 * @default {true}
	 */
	"deno-lint-ignore-line-reason"?: boolean;
	/**
	 * Require normalize the case of the hex number; Default to upper case.
	 * @default {true}
	 */
	"fmt-hex-case"?: boolean | RuleFmtHexCaseOptions;
	/**
	 * Require normalize the JSDoc.
	 * @default {true}
	 */
	"fmt-jsdoc"?: boolean;
	/**
	 * Require normalize the case of the numeric base to lower case.
	 * @default {true}
	 */
	"fmt-numeric-base-case"?: boolean;
	/**
	 * Require normalize the case of the numeric exponent to lower case.
	 * @default {true}
	 */
	"fmt-numeric-exponent-case"?: boolean;
	/**
	 * Require normalize the sign of the numeric exponent.
	 * @default {false}
	 */
	"fmt-numeric-exponent-sign"?: boolean | RuleFmtNumericExponentSignOptions;
	/**
	 * Require normalize the numeric separation.
	 * @default {true}
	 */
	"fmt-numeric-separation"?: boolean | RuleFmtNumericSeparationOptions;
	/**
	 * Require `import` statement locate at the start of the script.
	 * @default {true}
	 */
	"import-at-start"?: boolean;
	/**
	 * Require the JSDoc `@deprecated` tag have a reason.
	 * @default {true}
	 */
	"jsdoc-deprecated-reason"?: boolean;
	/**
	 * Restrict maximum complexity of the code.
	 * @default {false}
	 */
	"max-complexity"?: boolean | RuleMaxComplexityOptions;
	/**
	 * Restrict maximum lines of the script file.
	 * @default {false}
	 */
	"max-file-lines"?: boolean | RuleMaxFileLinesOptions;
	/**
	 * Restrict maximum size of the script file.
	 * @default {false}
	 */
	"max-file-size"?: boolean | RuleMaxFileSizeOptions;
	/**
	 * Restrict maximum length of the identifier.
	 * @default {false}
	 */
	"max-identifier-length"?: boolean | RuleMaxIdentifierLengthOptions;
	/**
	 * Restrict maximum nest of the ternary expressions.
	 * @default {false}
	 */
	"max-nest-ternaries"?: boolean | RuleMaxNestTernariesOptions;
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
	 * Forbid `return` statement with value in the class constructor.
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
	 * Forbid use of `delete` operator.
	 * @default {false}
	 */
	"no-delete"?: boolean;
	/**
	 * Forbid use of `@deno-types` directive.
	 * @default {true}
	 */
	"no-deno-types"?: boolean;
	/**
	 * Forbid use of `Deno`.
	 * @default {false}
	 */
	"no-deno"?: boolean;
	/**
	 * Forbid depend module via absolute path.
	 * @default {true}
	 */
	"no-depend-from-absolute"?: boolean;
	/**
	 * Forbid depend module via protocol `data:`.
	 * @default {true}
	 */
	"no-depend-from-data"?: boolean;
	/**
	 * Forbid depend module from DLMR (Deno Land Module Registry).
	 * @default {true}
	 */
	"no-depend-from-dlmr"?: boolean;
	/**
	 * Forbid depend module via protocol `file:`.
	 * @default {true}
	 */
	"no-depend-from-file"?: boolean;
	/**
	 * Forbid depend module via protocol `http:`.
	 * @default {true}
	 */
	"no-depend-from-http"?: boolean;
	/**
	 * Forbid depend module via protocol `https:`.
	 * @default {false}
	 */
	"no-depend-from-https"?: boolean;
	/**
	 * Forbid depend module from JSR via protocol `jsr:`.
	 * @default {false}
	 */
	"no-depend-from-jsr-protocol"?: boolean;
	/**
	 * Forbid depend module from JSR via URL.
	 * @default {true}
	 */
	"no-depend-from-jsr-url"?: boolean;
	/**
	 * Forbid depend non functional NodeJS module in Deno.
	 * @default {true}
	 */
	"no-depend-from-node-non-functional"?: boolean;
	/**
	 * Forbid depend NodeJS module (i.e.: via protocol `node:`).
	 * @default {false}
	 */
	"no-depend-from-node"?: boolean;
	/**
	 * Forbid depend module from NPM via protocol `npm:`.
	 * @default {false}
	 */
	"no-depend-from-npm-protocol"?: boolean;
	/**
	 * Forbid depend module from NPM via URL.
	 * @default {true}
	 */
	"no-depend-from-npm-url"?: boolean;
	/**
	 * Forbid depend self.
	 * @default {true}
	 */
	"no-depend-from-self"?: boolean;
	/**
	 * Forbid depend file or script with bytes type.
	 * @default {false}
	 */
	"no-depend-type-bytes"?: boolean;
	/**
	 * Forbid depend JSON file, or file or script with JSON type.
	 * @default {false}
	 */
	"no-depend-type-json"?: boolean;
	/**
	 * Forbid depend file or script with text type.
	 * @default {false}
	 */
	"no-depend-type-text"?: boolean;
	/**
	 * Forbid depend WASM (WebAssembly) module.
	 * @default {false}
	 */
	"no-depend-type-wasm"?: boolean;
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
	 * Forbid duplicate `interface`s.
	 * @default {true}
	 */
	"no-duplicate-interfaces"?: boolean;
	/**
	 * Forbid duplicate set types in intersection or union.
	 * @default {true}
	 */
	"no-duplicate-set-types"?: boolean;
	/**
	 * Forbid duplicate `typeof`s.
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
	 * Forbid empty comment block.
	 * @default {true}
	 */
	"no-empty-comment-block"?: boolean;
	/**
	 * Forbid empty comment line.
	 * @default {true}
	 */
	"no-empty-comment-line"?: boolean;
	/**
	 * Forbid empty JSDoc.
	 * @default {true}
	 */
	"no-empty-jsdoc"?: boolean;
	/**
	 * Forbid empty `yield`.
	 * @default {true}
	 */
	"no-empty-yield"?: boolean;
	/**
	 * Forbid use of `enum` with mix value type.
	 * @default {true}
	 */
	"no-enum-mix-value-type"?: boolean;
	/**
	 * Forbid use of `enum`.
	 * @default {true}
	 */
	"no-enum"?: boolean;
	/**
	 * Forbid export dependency.
	 * @default {true}
	 */
	"no-export-depend"?: boolean;
	/**
	 * Forbid float with lone dot (`.`).
	 * @default {true}
	 */
	"no-float-dot-lone"?: boolean;
	/**
	 * Forbid float without integer but with start dot (`.`).
	 * @default {true}
	 */
	"no-float-dot-start"?: boolean;
	/**
	 * Forbid use of IIFE (immediately invoked function expression).
	 * @default {false}
	 */
	"no-iife"?: boolean;
	/**
	 * Forbid import module dynamically.
	 * @default {false}
	 */
	"no-import-dynamic"?: boolean;
	/**
	 * Forbid import file, module, or script as source.
	 * @default {false}
	 */
	"no-import-source"?: boolean;
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
	 * Forbid use of TypeScript inject feature.
	 * @default {false}
	 */
	"no-typescript-inject-feature"?: boolean;
	/**
	 * Forbid unknown JSDoc tag.
	 * @default {true}
	 */
	"no-unknown-jsdoc-tag"?: boolean;
	/**
	 * Forbid unsafe number.
	 * @default {true}
	 */
	"no-unsafe-number"?: boolean;
	/**
	 * Forbid use of `use strict` directive.
	 * @default {true}
	 */
	"no-use-strict"?: boolean;
	/**
	 * Forbid useless block and nest block.
	 * @default {true}
	 */
	"no-useless-block"?: boolean;
	/**
	 * Forbid useless calculate on strings.
	 * @default {true}
	 */
	"no-useless-calculate-strings"?: boolean;
	/**
	 * Forbid useless `catch` statement.
	 * @default {true}
	 */
	"no-useless-catch"?: boolean;
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
	 * Forbid useless expression which will do nothing.
	 * @default {true}
	 */
	"no-useless-expression"?: boolean;
	/**
	 * Forbid useless numeric exponent.
	 * @default {true}
	 */
	"no-useless-numeric-exponent"?: boolean;
	/**
	 * Forbid useless `switch` case.
	 * @default {true}
	 */
	"no-useless-switch-case"?: boolean;
	/**
	 * Forbid useless expression in the template string.
	 * @default {true}
	 */
	"no-useless-template-string-expression"?: boolean;
	/**
	 * Forbid useless template string.
	 * @default {false}
	 */
	"no-useless-template-string"?: boolean | RuleNoUselessTemplateStringOptions;
	/**
	 * Forbid useless ternary expression.
	 * @default {true}
	 */
	"no-useless-ternary"?: boolean;
	/**
	 * Forbid useless `type`.
	 * @default {true}
	 */
	"no-useless-type"?: boolean;
	/**
	 * Forbid use of `using` statement and `await using` statement.
	 * @default {false}
	 */
	"no-using"?: boolean;
	/**
	 * Forbid use of void operator.
	 * @default {false}
	 */
	"no-void"?: boolean;
	/**
	 * Prefer to use `interface` instead of `type`.
	 * @default {true}
	 */
	"prefer-interface"?: boolean;
	/**
	 * Require `Symbol` to have a description.
	 * @default {false}
	 */
	"symbol-description"?: boolean;
	/**
	 * Require the literal array have unique elements when explicitly specify before with block comment.
	 * @default {true}
	 */
	"unique-array"?: boolean;
}
export interface PluginOptions {
	/**
	 * Rules tags to use.
	 * 
	 * To disable rules tags, define this property with empty array (`[]`).
	 * @default {["recommended"]}
	 */
	tags?: readonly RuleTag[];
	/**
	 * Rules options.
	 */
	rules?: RulesOptions;
}
export function setup(options: PluginOptions = {}): Deno.lint.Plugin {
	const {
		rules: rulesOptions = {},
		tags: tagsOptions = ["recommended"]
	}: PluginOptions = options;
	const tagsOptionsFmt: Set<RuleTag> = new Set<RuleTag>(tagsOptions);
	const result: Record<string, Deno.lint.Rule> = {};
	for (const rule of rules) {
		const ruleOptions: RulesOptions[keyof RulesOptions] | undefined = rulesOptions[rule.identifier as keyof RulesOptions];
		if (typeof ruleOptions === "boolean") {
			if (ruleOptions) {
				result[rule.identifier] = rule.querier();
			}
		} else if (typeof ruleOptions !== "undefined") {
			result[rule.identifier] = rule.querier(ruleOptions);
		} else if (
			tagsOptionsFmt.has("all") ||
			tagsOptionsFmt.intersection(new Set<RuleTag>(rule.tags)).size > 0
		) {
			result[rule.identifier] = rule.querier();
		}
	}
	return constructPlugin(result);
}
