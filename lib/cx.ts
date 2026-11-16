/** Joins class names, skipping falsy values: cx("a", cond && "b"). */
export const cx = (...names: (string | false | null | undefined)[]) => names.filter(Boolean).join(" ");
