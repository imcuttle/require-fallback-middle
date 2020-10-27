/**
 * Module to hook into the Node.js require and require.resolve function
 * @author imcuttle
 */
import * as resolveFrom from 'resolve-from'
import requireResolveHook, { bypass, unhook, Match } from 'require-resolve-hook'

function requireFallbackMiddle(
  match: Match,
  fallbackDirs = [process.cwd(), __dirname],
  { useLocalByPass = true } = {}
) {
  const ctx = requireResolveHook(match, (id) => {
    for (const dir of fallbackDirs) {
      const bypassInner = useLocalByPass ? ctx.bypass : bypass
      const filename = bypassInner(() => resolveFrom.silent(dir, id))
      if (filename) {
        return filename
      }
    }

    const err = new Error(`Cannot find module '${id}' in \n${fallbackDirs.map((dir) => `- ${dir}`).join('\n')}`)
    // @ts-ignore
    err.code = 'MODULE_NOT_FOUND'
    throw err
  })
  return ctx
}

export { bypass, unhook }

export default requireFallbackMiddle
