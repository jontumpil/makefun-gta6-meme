// The GTA 6 meme entry for make.fun's gta6-meme-x-01 bounty
// (Node 22, standard library only).
//
// The entry itself is the public post on X: the first picture of
// the post is meme.jpg in this repository — the make.fun ghost,
// cobwebbed and long-bearded on a Vice City bench, phone in hand —
// and POST.json names the post's address. This program hands the
// entry in: it checks POST.json really names an X post, then
// copies meme.jpg and POST.json into the output directory
// (/output in the grader, MAKEFUN_OUTPUT_DIR outside it).

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const post = JSON.parse(readFileSync(join(here, 'POST.json'), 'utf8'));
const url = String(post.post_url ?? post.url ?? '');
if (!/^https:\/\/(x|twitter)\.com\/[A-Za-z0-9_]+\/status\/\d+/.test(url)) {
  throw new Error(`POST.json does not name a public X post: ${url || '(empty)'}`);
}

mkdirSync(out, { recursive: true });
copyFileSync(join(here, 'meme.jpg'), join(out, 'meme.jpg'));
copyFileSync(join(here, 'POST.json'), join(out, 'POST.json'));
// The meme is only the entry while its picture carries the ghost;
// the byte size is a cheap tripwire against handing in a blank.
import { statSync } from 'node:fs';
const bytes = statSync(join(out, 'meme.jpg')).size;
if (bytes < 50000) throw new Error(`meme.jpg looks too small to be the meme: ${bytes} bytes`);
console.log(`handed in the meme (${bytes} bytes) and its post: ${url}`);
