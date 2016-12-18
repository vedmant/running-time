/**
 * Mutation creator helper
 *
 * @param types
 * @param fn
 * @return {{}}
 */
export function makeMutations(types, fn) {
  const res = {};
  types.forEach(type => {
    res[type] = fn
  });

  return res;
}

/**
 * Make simple action helper
 *
 * @param type
 * @return {function({commit: *}, ...[*]): *}
 */
function makeAction(type) {
  return ({commit}, ...args) => commit(type, ...args)
}
