import childProcess from 'child_process'
import {promisify} from 'util'
import path from 'path'
import fs from 'fs-extra'

const exec = promisify(childProcess.exec)

export default async function (packagePath, targetPath) {
  if (process.env.CI) {
    await exec(`yarn add --network-concurrency 1 file:${packagePath}`, {
      cwd: targetPath
    })
  } else {
    const {name: packageName, bin = {}} = await fs.readJson(
      path.resolve(packagePath, 'package.json')
    )

    await fs.ensureSymlink(
      packagePath,
      path.resolve(targetPath, 'node_modules', packageName)
    )

    if (typeof bin === 'string') {
      const binPath = bin
      const binName = packageName
      await fs.ensureSymlink(
        path.resolve(packagePath, binPath),
        path.resolve(targetPath, 'node_modules', '.bin', binName)
      )
    } else {
      for (const [binName, binPath] of Object.entries(bin)) {
        await fs.ensureSymlink(
          path.resolve(packagePath, binPath),
          path.resolve(targetPath, 'node_modules', '.bin', binName)
        )
      }
    }
  }
}
