/**
 * Mutation creator helper
 *
 * @param types
 * @param fn
 * @return {{}}
 */
export function makeMutations (types, fn) {
  const res = {}
  types.forEach(type => {
    res[type] = fn
  })

  return res
}
