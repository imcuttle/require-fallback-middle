/**
 * Module to hook into the Node.js require and require.resolve function
 * @author imcuttle
 */
import * as resolveFrom from 'resolve-from'
import requireResolveHook, { bypass, unhook, Match } from 'require-resolve-hook'
import * as Module from 'module'
import * as callerPath from 'caller-path'
import { dirname, isAbsolute } from 'path'

type FallbackDirs = string[] | ((id: string, parent: Module, isMain: boolean) => string[])

function requireFallbackMiddle(
  match: Match = (id) => !isAbsolute(id) && !id.startsWith('.'),
  fallbackDirs?: FallbackDirs,
  { useLocalByPass = true } = {}
) {
  const callDir = dirname(callerPath())
  fallbackDirs =
    fallbackDirs || ((id, parent) => [parent && dirname(parent.filename), process.cwd(), callDir].filter(Boolean))

  const ctx = requireResolveHook(match, (id, parent, isMain) => {
    let dirs: string[]
    if (typeof fallbackDirs === 'function') {
      dirs = fallbackDirs(id, parent, isMain)
    } else {
      dirs = fallbackDirs
    }

    for (const dir of dirs) {
      const bypassInner = useLocalByPass ? ctx.bypass : bypass
      const filename = bypassInner(() => resolveFrom.silent(dir, id))
      if (filename) {
        return filename
      }
    }

    const err = new Error(`Cannot find module '${id}' in \n${dirs.map((dir) => `- ${dir}`).join('\n')}`)
    // @ts-ignore
    err.code = 'MODULE_NOT_FOUND'
    throw err
  })
  return ctx
}

export { bypass, unhook }

export default requireFallbackMiddle
