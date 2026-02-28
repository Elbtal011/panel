import { spawn } from 'node:child_process'

const PORT = 4173
const BASE = `http://127.0.0.1:${PORT}`
const npmCmd = 'npm'
const useShell = process.platform === 'win32'

const routes = [
  '/',
  '/bewerbungen',
  '/bewerbungen/details',
  '/mitarbeiter',
  '/mitarbeiter/admin',
  '/mitarbeiter/admin/bearbeiten',
  '/kyc-pruefung',
  '/aufgaben-pruefung',
  '/ident-anfragen',
  '/bewertungen',
  '/auftraege',
  '/auftraege/neu',
  '/auftraege/bosch',
  '/stellenanzeigen',
  '/stellenanzeigen/neu',
  '/caller',
  '/telefonnummern',
  '/bankdrops',
  '/ai-chat-agent',
  '/chat-ueberwachung',
  '/email-verlauf',
  '/email-anbieter',
  '/einstellungen',
]

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: useShell, ...options })
    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${command} ${args.join(' ')} failed with exit code ${code}`))
    })
    child.on('error', reject)
  })
}

async function waitForServer(url, timeoutMs = 20000) {
  const started = Date.now()
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url)
      if (res.ok) return
    } catch {
      // retry
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
  }
  throw new Error(`Preview server did not become ready at ${url} within ${timeoutMs}ms`)
}

async function checkRoute(pathname) {
  const url = `${BASE}${pathname}`
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Route ${pathname} returned HTTP ${res.status}`)
  }
  const html = await res.text()
  if (!html.includes('<div id="root"></div>') && !html.includes('<div id="root">')) {
    throw new Error(`Route ${pathname} did not return expected app shell`)
  }
}

async function main() {
  await run(npmCmd, ['run', 'qa:build'])

  const preview = spawn(
    npmCmd,
    ['run', 'preview', '--workspace', 'client', '--', '--host', '127.0.0.1', '--port', String(PORT), '--strictPort'],
    { stdio: 'pipe', shell: useShell },
  )

  preview.stdout.on('data', (chunk) => process.stdout.write(chunk))
  preview.stderr.on('data', (chunk) => process.stderr.write(chunk))

  try {
    await waitForServer(BASE)
    for (const route of routes) {
      await checkRoute(route)
      process.stdout.write(`Smoke OK: ${route}\n`)
    }
  } finally {
    preview.kill('SIGTERM')
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
