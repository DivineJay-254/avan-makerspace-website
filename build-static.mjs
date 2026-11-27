import { spawn } from 'node:child_process'
import { cp, existsSync } from 'node:fs'
import { mkdtemp, rm } from 'node:fs/promises'
import { dirname, join, basename } from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const copy = promisify(cp)
const projectRoot = dirname(fileURLToPath(import.meta.url))
const excludedPaths = [join(projectRoot, 'app', 'admin'), join(projectRoot, 'app', 'api'), join(projectRoot, 'proxy.ts')]
const backupRoot = await mkdtemp(join(tmpdir(), 'avan-static-'))
const movedPaths = []

try {
  for (const sourcePath of excludedPaths) {
    if (!existsSync(sourcePath)) continue
    const backupPath = join(backupRoot, `${movedPaths.length}-${basename(sourcePath)}`)
    await copy(sourcePath, backupPath, { recursive: true })
    movedPaths.push({ sourcePath, backupPath })
    await rm(sourcePath, { recursive: true, force: true })
  }

  const exitCode = await new Promise((resolve, reject) => {
    const buildProcess = spawn('corepack', ['pnpm', 'exec', 'next', 'build'], {
      cwd: projectRoot,
      env: { ...process.env, STATIC_EXPORT: '1' },
      stdio: 'inherit',
    })
    buildProcess.once('error', reject)
    buildProcess.once('exit', (code, signal) => resolve(code ?? (signal ? 1 : 0)))
  })

  if (exitCode !== 0) process.exitCode = exitCode
} finally {
  for (const { sourcePath, backupPath } of movedPaths.reverse()) {
    if (!existsSync(sourcePath)) await copy(backupPath, sourcePath, { recursive: true })
  }
  await rm(backupRoot, { recursive: true, force: true })
}
