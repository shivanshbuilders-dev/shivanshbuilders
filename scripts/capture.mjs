import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

// CLI args:
// node scripts/capture.mjs <file-or-url> <out-png> [width=1280] [height=900] [scroll-selector-or-y]
const target = process.argv[2] || 'website/index.html';
const outPath = process.argv[3] || 'capture.png';
const width = parseInt(process.argv[4] || '1280', 10);
const height = parseInt(process.argv[5] || '900', 10);
const scrollParam = process.argv[6] || '';

const fullUrl = target.startsWith('http') || target.startsWith('file:') 
  ? target 
  : `file:///${path.resolve(target).replace(/\\/g, '/')}`;

const resolvedOutPath = path.isAbsolute(outPath) 
  ? outPath 
  : path.resolve(outPath);

const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const PORT = 9900 + Math.floor(Math.random() * 90);
const profile = path.join(os.tmpdir(), 'opencode', `shot-${Date.now()}`);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const child = spawn(EDGE, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
  '--no-default-browser-check', '--mute-audio', `--user-data-dir=${profile}`,
  `--remote-debugging-port=${PORT}`, `--window-size=${width},${height}`, 'about:blank',
], { stdio: 'ignore' });

async function run() {
  for (let i = 0; i < 50; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (r.ok) break;
    } catch {}
    await sleep(120);
  }

  const list = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
  const page = list.find((t) => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res) => ws.addEventListener('open', res));

  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
    }
  });

  const send = (method, params = {}) => {
    const curId = ++id;
    return new Promise((res, rej) => {
      pending.set(curId, { resolve: res, reject: rej });
      ws.send(JSON.stringify({ id: curId, method, params }));
    });
  };

  await send('Page.enable');
  await send('Page.navigate', { url: fullUrl });
  await sleep(1500);

  if (scrollParam) {
    if (/^\d+$/.test(scrollParam)) {
      await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${scrollParam});` });
    } else {
      await send('Runtime.evaluate', { expression: `document.querySelector('${scrollParam}')?.scrollIntoView({block: 'center'});` });
    }
    await sleep(800);
  }

  const snap = await send('Page.captureScreenshot', { format: 'png' });
  fs.mkdirSync(path.dirname(resolvedOutPath), { recursive: true });
  fs.writeFileSync(resolvedOutPath, Buffer.from(snap.data, 'base64'));
  console.log(`Saved screenshot to: ${resolvedOutPath}`);

  try { child.kill('SIGKILL'); } catch {}
}

run().catch((e) => {
  console.error(e);
  try { child.kill('SIGKILL'); } catch {}
  process.exit(1);
});
