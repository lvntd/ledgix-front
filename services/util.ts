/* eslint-disable */
// The underlying code is taken from react-router source code. We don't include the package as a dependency because the project requires only these utility functions

function warning(cond: any, message: string): void {
  if (!cond) {
    // eslint-disable-next-line no-console
    if (typeof console !== "undefined") console.warn(message);

    try {
      // Welcome to debugging React Router!
      //
      // This error is thrown as a convenience so you can more easily
      // find the source for a warning that appears in the console by
      // enabling "pause on exceptions" in your JavaScript debugger.
      throw new Error(message);
      // eslint-disable-next-line no-empty
    } catch (e) {}
  }
}

// Recursive helper for finding path parameters in the absence of wildcards
type _PathParam<Path extends string> =
  // split path into individual path segments
  Path extends `${infer L}/${infer R}`
    ? _PathParam<L> | _PathParam<R>
    : // find params after `:`
    Path extends `:${infer Param}`
    ? Param
    : // otherwise, there aren't any params present
      never;

/**
 * Examples:
 * "/a/b/*" -> "*"
 * ":a" -> "a"
 * "/a/:b" -> "b"
 * "/a/blahblahblah:b" -> "b"
 * "/:a/:b" -> "a" | "b"
 * "/:a/b/:c/*" -> "a" | "c" | "*"
 */
type PathParam<Path extends string> =
  // check if path is just a wildcard
  Path extends "*"
    ? "*"
    : // look for wildcard at the end of the path
    Path extends `${infer Rest}/*`
    ? "*" | _PathParam<Rest>
    : // look for params in the absence of wildcards
      _PathParam<Path>;

/**
 * @private
 */
export function invariant(value: boolean, message?: string): asserts value;
export function invariant<T>(
  value: T | null | undefined,
  message?: string
): asserts value is T;
export function invariant(value: any, message?: string) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}

/**
 * Returns a path with params interpolated.
 *
 * @see https://reactrouter.com/utils/generate-path
 */
export function generatePath<Path extends string>(
  originalPath: Path,
  params: {
    [key in PathParam<Path>]: string;
  } = {} as any
): string {
  let path = originalPath;
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    warning(
      false,
      `Route path "${path}" will be treated as if it were ` +
        `"${path.replace(/\*$/, "/*")}" because the \`*\` character must ` +
        `always follow a \`/\` in the pattern. To get rid of this warning, ` +
        `please change the route path to "${path.replace(/\*$/, "/*")}".`
    );
    path = path.replace(/\*$/, "/*") as Path;
  }

  return path
    .replace(/^:(\w+)/g, (_, key: PathParam<Path>) => {
      invariant(params[key] != null, `Missing ":${key}" param`);
      return params[key]!;
    })
    .replace(/\/:(\w+)/g, (_, key: PathParam<Path>) => {
      invariant(params[key] != null, `Missing ":${key}" param`);
      return `/${params[key]!}`;
    })
    .replace(/(\/?)\*/, (_, prefix, __, str) => {
      const star = "*" as PathParam<Path>;

      if (params[star] == null) {
        // If no splat was provided, trim the trailing slash _unless_ it's
        // the entire path
        return str === "/*" ? "/" : "";
      }

      // Apply the splat
      return `${prefix}${params[star]}`;
    });
}

type ExtractRouteOptionalParam<
  T extends string,
  U = string | number | boolean
> = T extends `${infer Param}?`
  ? { [k in Param]?: U }
  : T extends `${infer Param}*`
  ? { [k in Param]?: U }
  : T extends `${infer Param}+`
  ? { [k in Param]: U }
  : { [k in T]: U };

export type ExtractRouteParams<
  T extends string,
  U = string | number | boolean
> = string extends T
  ? { [k in string]?: U }
  : T extends `${infer _Start}:${infer ParamWithOptionalRegExp}/${infer Rest}`
  ? ParamWithOptionalRegExp extends `${infer Param}(${infer _RegExp})`
    ? ExtractRouteOptionalParam<Param, U> & ExtractRouteParams<Rest, U>
    : ExtractRouteOptionalParam<ParamWithOptionalRegExp, U> &
        ExtractRouteParams<Rest, U>
  : T extends `${infer _Start}:${infer ParamWithOptionalRegExp}`
  ? ParamWithOptionalRegExp extends `${infer Param}(${infer _RegExp})`
    ? ExtractRouteOptionalParam<Param, U>
    : ExtractRouteOptionalParam<ParamWithOptionalRegExp, U>
  : {};
