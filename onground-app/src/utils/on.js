/**
 * The original HTML used inline handlers, e.g. onclick="openX(this)".
 * `on()` keeps them 1:1: the handler body runs with `this` = the element and
 * looks up the global functions defined by the legacy scripts (public/legacy).
 */
export const on = (fn) => (e) => fn.call(e.currentTarget, e);
