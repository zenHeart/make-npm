const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { once } = require('node:events');

async function main() {
  const html = fs.readFileSync('dist/index.html', 'utf8');
  const attributes = [...html.matchAll(/\b(href|src|data-markdown|data-separator-vertical|data-separator|class)=(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)]
    .map(([, name, quoted, singleQuoted, unquoted]) => [name, quoted ?? singleQuoted ?? unquoted]);
  const chapters = attributes.filter(([name]) => name === 'data-markdown').map(([, value]) => value);
  const expected = fs.readdirSync('ppt').filter(name => name.endsWith('.md')).sort();
  assert.deepEqual(chapters, expected, 'Every chapter must be in the generated presentation');
  assert.equal(attributes.filter(([name, value]) => name === 'class' && value === 'slides').length, 1, 'Reveal uses one slides container');
  for (const [name, value] of attributes.filter(([name]) => name.startsWith('data-separator'))) {
    const separator = new RegExp(value, 'm');
    const middle = name === 'data-separator' ? '---' : '';
    assert.ok(separator.test(`\n${middle}\n`) && separator.test(`\r\n${middle}\r\n`), 'Slide separators must work with LF and CRLF');
  }
  const references = attributes.filter(([name]) => ['href', 'src', 'data-markdown'].includes(name)).map(([, value]) => value);
  for (const reference of references) {
    assert.ok(fs.statSync(path.join('dist', reference)).size > 0, `Missing or empty asset: ${reference}`);
  }

  const server = spawn(process.execPath, [require.resolve('webpack/bin/webpack.js'), 'serve',
    '--no-open', '--host', '127.0.0.1', '--port', '0'], { stdio: ['ignore', 'pipe', 'pipe'] });
  let output = '';
  let address;
  try {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error(`Dev server did not start:\n${output}`)), 30000);
      const receive = chunk => {
        output += chunk;
        address = output.match(/http:\/\/127\.0\.0\.1:\d+\//)?.[0];
        if (address && /compiled successfully/.test(output)) {
          clearTimeout(timeout);
          resolve();
        }
      };
      server.stdout.on('data', receive);
      server.stderr.on('data', receive);
      server.once('error', error => { clearTimeout(timeout); reject(error); });
      server.once('exit', code => { clearTimeout(timeout); reject(new Error(`Dev server exited ${code}:\n${output}`)); });
    });
    for (const reference of ['', ...references]) {
      const response = await fetch(new URL(reference, address), { signal: AbortSignal.timeout(10000) });
      assert.equal(response.status, 200, `Dev server cannot serve ${reference || 'index.html'}`);
      assert.ok((await response.text()).length > 0, `Empty HTTP response: ${reference}`);
    }
    console.log(`Verified ${chapters.length} chapters, ${references.length} production assets and ${references.length + 1} dev-server responses.`);
  } finally {
    if (server.exitCode === null && server.signalCode === null) {
      const exited = once(server, 'exit');
      server.kill('SIGTERM');
      const force = setTimeout(() => server.kill('SIGKILL'), 5000);
      await exited;
      clearTimeout(force);
    }
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
