import path from 'node:path'
import childProcess from 'node:child_process'
import {promisify} from 'node:util'
import test from 'ava'
import {useTemporaryDirectory} from 'ava-patterns'
import install from './index.js'

const exec = promisify(childProcess.exec)

test('installing a package', async (t) => {
  const directory = await useTemporaryDirectory(t)

  await install(path.resolve('test', 'fixture-project'), directory.path)

  await directory.writeFile(
    'index.mjs',
    `
      import text from 'fixture-project'
      export default text
    `,
  )

  const m = await import(path.resolve(directory.path, 'index.mjs'))
  t.is(m.default, 'Hello World!')

  const {stdout} = await exec('npx some-bin', {cwd: directory.path})
  t.true(stdout.includes('Hello World!'))
})
