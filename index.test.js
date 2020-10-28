import test from 'ava'
import path from 'path'
import childProcess from 'child_process'
import {promisify} from 'util'
import fs from 'fs-extra'
import tempy from 'tempy'
import install from './index.js'

const exec = promisify(childProcess.exec)

test('installing a package', async (t) => {
  const directory = tempy.directory()

  await fs.ensureDir(directory)
  t.teardown(async () => {
    await fs.remove(directory)
  })

  await install(path.resolve('test', 'fixture-project'), directory)

  await fs.writeFile(
    path.resolve(directory, 'index.mjs'),
    `
      import text from 'fixture-project'
      export default text
    `
  )

  t.is(
    (await import(path.resolve(directory, 'index.mjs'))).default,
    'Hello World!'
  )

  const {stdout} = await exec('npx some-bin', {cwd: directory})
  t.true(stdout.includes('Hello World!'))
})
