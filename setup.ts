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
import { ruleData as ruleFmtNumericBaseCase } from "./_rules/fmt_numeric_base_case.ts";
import { ruleData as ruleFmtNumericExponentCase } from "./_rules/fmt_numeric_exponent_case.ts";
import {
	ruleData as ruleFmtNumericFloatDot,
	type RuleFmtNumericFloatDotOptions
} from "./_rules/fmt_numeric_float_dot.ts";
import {
	ruleData as ruleFmtNumericExponentSign,
	type RuleFmtNumericExponentSignOptions
} from "./_rules/fmt_numeric_exponent_sign.ts";
import {
	ruleData as ruleFmtNumericSeparation,
	type RuleFmtNumericSeparationOptions
} from "./_rules/fmt_numeric_separation.ts";
import { ruleData as ruleImportAtStart } from "./_rules/import_at_start.ts";
import {
	ruleData as ruleMaxComplexity,
	type RuleMaxComplexityOptions
} from "./_rules/max_complexity.ts";
import {
	ruleData as ruleMaxFileSize,
	type RuleMaxFileSizeOptions
} from "./_rules/max_file_size.ts";
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
import { ruleData as ruleNoDeno } from "./_rules/no_deno.ts";
import { ruleData as ruleNoDependSourceAbsolute } from "./_rules/no_depend_source_absolute.ts";
import { ruleData as ruleNoDependSourceData } from "./_rules/no_depend_source_data.ts";
import { ruleData as ruleNoDependSourceDLMR } from "./_rules/no_depend_source_dlmr.ts";
import { ruleData as ruleNoDependSourceFile } from "./_rules/no_depend_source_file.ts";
import { ruleData as ruleNoDependSourceHTTP } from "./_rules/no_depend_source_http.ts";
import { ruleData as ruleNoDependSourceHTTPS } from "./_rules/no_depend_source_https.ts";
import { ruleData as ruleNoDependSourceJSRProtocol } from "./_rules/no_depend_source_jsr_protocol.ts";
import { ruleData as ruleNoDependSourceJSRURL } from "./_rules/no_depend_source_jsr_url.ts";
import { ruleData as ruleNoDependSourceNodeNonFunctional } from "./_rules/no_depend_source_node_non_functional.ts";
import { ruleData as ruleNoDependSourceNode } from "./_rules/no_depend_source_node.ts";
import { ruleData as ruleNoDependSourceNPMProtocol } from "./_rules/no_depend_source_npm_protocol.ts";
import { ruleData as ruleNoDependSourceNPMURL } from "./_rules/no_depend_source_npm_url.ts";
import { ruleData as ruleNoDependSourceSelf } from "./_rules/no_depend_source_self.ts";
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
import { ruleData as ruleNoEmptyYield } from "./_rules/no_empty_yield.ts";
import { ruleData as ruleNoEnum } from "./_rules/no_enum.ts";
import { ruleData as ruleNoExportDepend } from "./_rules/no_export_depend.ts";
import { ruleData as ruleNoIIFE } from "./_rules/no_iife.ts";
import { ruleData as ruleNoImportDynamic } from "./_rules/no_import_dynamic.ts";
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
import { ruleData as ruleNoUselessCalculateStrings } from "./_rules/no_useless_calculate_strings.ts";
import { ruleData as ruleNoUselessCatch } from "./_rules/no_useless_catch.ts";
import { ruleData as ruleNoUselessContinue } from "./_rules/no_useless_continue.ts";
import { ruleData as ruleNoUselessElse } from "./_rules/no_useless_else.ts";
import { ruleData as ruleNoUselessExport } from "./_rules/no_useless_export.ts";
import { ruleData as ruleNoUselessExpression } from "./_rules/no_useless_expression.ts";
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
import {
	ruleData as ruleRegexpFlagUnicode,
	type RuleRegExpFlagUnicodeOptions
} from "./_rules/regexp_flag_unicode.ts";
import { ruleData as ruleSTDOnJSR } from "./_rules/std_on_jsr.ts";
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
	RuleFmtNumericFloatDotOptions,
	RuleFmtNumericSeparationOptions,
	RuleMaxComplexityOptions,
	RuleMaxFileSizeOptions,
	RuleMaxNestTernariesOptions,
	RuleMaxParamsOptions,
	RuleNoUselessTemplateStringOptions,
	RuleRegExpFlagUnicodeOptions
};
//deno-lint-ignore no-explicit-any -- Lazy
const rules: readonly RuleData<any>[] = [
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
	ruleFmtNumericBaseCase,
	ruleFmtNumericExponentCase,
	ruleFmtNumericExponentSign,
	ruleFmtNumericFloatDot,
	ruleFmtNumericSeparation,
	ruleImportAtStart,
	ruleMaxComplexity,
	ruleMaxFileSize,
	ruleMaxNestTernaries,
	ruleMaxParams,
	ruleNoAlert,
	ruleNoCharacterAmbiguous,
	ruleNoCharacterInvisible,
	ruleNoClassConstructorReturn,
	ruleNoConfirm,
	ruleNoDecorator,
	ruleNoDelete,
	ruleNoDeno,
	ruleNoDependSourceAbsolute,
	ruleNoDependSourceData,
	ruleNoDependSourceDLMR,
	ruleNoDependSourceFile,
	ruleNoDependSourceHTTP,
	ruleNoDependSourceHTTPS,
	ruleNoDependSourceJSRProtocol,
	ruleNoDependSourceJSRURL,
	ruleNoDependSourceNodeNonFunctional,
	ruleNoDependSourceNode,
	ruleNoDependSourceNPMProtocol,
	ruleNoDependSourceNPMURL,
	ruleNoDependSourceSelf,
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
	ruleNoEmptyYield,
	ruleNoEnum,
	ruleNoExportDepend,
	ruleNoIIFE,
	ruleNoImportDynamic,
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
	ruleNoUselessCalculateStrings,
	ruleNoUselessCatch,
	ruleNoUselessContinue,
	ruleNoUselessElse,
	ruleNoUselessExport,
	ruleNoUselessExpression,
	ruleNoUselessSwitchCase,
	ruleNoUselessTemplateStringExpression,
	ruleNoUselessTemplateString,
	ruleNoUselessTernary,
	ruleNoUselessType,
	ruleNoUsing,
	ruleNoVoid,
	rulePreferInterface,
	ruleRegexpFlagUnicode,
	ruleSTDOnJSR,
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
	 * Require normalize the float of the numeric.
	 * @default {true}
	 */
	"fmt-numeric-float-dot"?: boolean | RuleFmtNumericFloatDotOptions;
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
	 * Restrict maximum complexity of the code.
	 * @default {false}
	 */
	"max-complexity"?: boolean | RuleMaxComplexityOptions;
	/**
	 * Restrict maximum size of the script file.
	 * @default {false}
	 */
	"max-file-size"?: boolean | RuleMaxFileSizeOptions;
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
	 * Forbid use of `Deno`.
	 * @default {false}
	 */
	"no-deno"?: boolean;
	/**
	 * Forbid depend module via absolute path.
	 * @default {true}
	 */
	"no-depend-source-absolute"?: boolean;
	/**
	 * Forbid depend module via protocol `data:`.
	 * @default {true}
	 */
	"no-depend-source-data"?: boolean;
	/**
	 * Forbid depend module from DLMR (Deno Land Module Registry).
	 * @default {true}
	 */
	"no-depend-source-dlmr"?: boolean;
	/**
	 * Forbid depend module via protocol `file:`.
	 * @default {true}
	 */
	"no-depend-source-file"?: boolean;
	/**
	 * Forbid depend module via protocol `http:`.
	 * @default {true}
	 */
	"no-depend-source-http"?: boolean;
	/**
	 * Forbid depend module via protocol `https:`.
	 * @default {false}
	 */
	"no-depend-source-https"?: boolean;
	/**
	 * Forbid depend module from JSR via protocol `jsr:`.
	 * @default {false}
	 */
	"no-depend-source-jsr-protocol"?: boolean;
	/**
	 * Forbid depend module from JSR via URL.
	 * @default {true}
	 */
	"no-depend-source-jsr-url"?: boolean;
	/**
	 * Forbid depend non functional NodeJS module in Deno.
	 * @default {true}
	 */
	"no-depend-source-node-non-functional"?: boolean;
	/**
	 * Forbid depend NodeJS module (i.e.: via protocol `node:`).
	 * @default {false}
	 */
	"no-depend-source-node"?: boolean;
	/**
	 * Forbid depend module from NPM via protocol `npm:`.
	 * @default {false}
	 */
	"no-depend-source-npm-protocol"?: boolean;
	/**
	 * Forbid depend module from NPM via URL.
	 * @default {true}
	 */
	"no-depend-source-npm-url"?: boolean;
	/**
	 * Forbid depend self.
	 * @default {true}
	 */
	"no-depend-source-self"?: boolean;
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
	 * Forbid export dependency.
	 * @default {true}
	 */
	"no-export-depend"?: boolean;
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
	 * Require the regular expression contain Unicode flag (`u` or `v`).
	 * @default {false}
	 */
	"regexp-flag-unicode"?: boolean | RuleRegExpFlagUnicodeOptions;
	/**
	 * Require depend Deno Standard Library (std) from JSR.
	 * @default {true}
	 */
	"std-on-jsr"?: boolean;
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
