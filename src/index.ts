import {BuildOptions} from "esbuild";
import path from "node:path";
import fs from 'fs-extra'


export const createExternalAlias = (alias: Record<string, string>) => {
  const aliasKeys = Object.keys(alias)

  const aliasMap = {}

  aliasKeys.forEach((key) => {
    const file = path.join(__dirname, 'alias', alias[key] + '.js')
    fs.ensureFileSync(file)
    fs.writeFileSync(file, `module.exports = ${alias[key]}`)
    aliasMap[key] = file
  })

  return aliasMap as BuildOptions['alias']
}

export const externalGlobal = (alias: Record<string, string>): (options: BuildOptions) => BuildOptions => {
  const aliasMap = createExternalAlias(alias)

  return (options: BuildOptions) => {
    const alias = options.alias || {}
    for (const key in aliasMap) {
      if (alias[key]) {
        throw new Error(`alias ${key} already exists`)
      }
      alias[key] = aliasMap[key]
    }
    return {
      ...options, alias
    }
  }
}
