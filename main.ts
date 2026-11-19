// Copies the committed front-page render (entry.png) into the sandbox output
// directory. Node 22 runs this TypeScript file directly; standard library only.
//
// Two grader constraints are deliberately respected here:
//   1. The grader runs this as an unprivileged user on a read-only root
//      filesystem with /output as the one writable mount. So we empty the
//      output directory's CONTENTS and never unlink the directory itself:
//      rmSync(dir, { recursive: true }) followed by mkdirSync(dir) fails with
//      EPERM on such a mount, because removing the mount point is not allowed.
//   2. The grader runs this program twice, so both runs must produce
//      byte-identical output. The copy is a straight file copy of the committed
//      PNG — no timestamps, no re-encoding — so run one and run two match.
import { copyFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// mkdir is idempotent: it succeeds when the directory already exists, which is
// the case on the second grader run and on a pre-mounted output directory.
mkdirSync(outDir, { recursive: true });

for (const name of readdirSync(outDir)) {
  rmSync(join(outDir, name), { recursive: true, force: true });
}

copyFileSync(join(here, 'entry.png'), join(outDir, 'entry.png'));

