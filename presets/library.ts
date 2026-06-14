import extendLibrary from "../extends/library.ts";
import { setup } from "../setup.ts";
export default setup(extendLibrary) satisfies Deno.lint.Plugin as Deno.lint.Plugin;
