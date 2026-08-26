import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const projectRoot = process.cwd();
const temporaryDirectory = mkdtempSync(join(tmpdir(), 'blog-css-check-'));
const generatedCandidate = join(temporaryDirectory, 'main.css');
const sassExecutable = join(
  projectRoot,
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'sass.cmd' : 'sass',
);

try {
  // 在临时目录重新编译，校验仓库中的 CSS 只来源于 Sass，而不覆盖现有产物。
  const buildResult = spawnSync(
    sassExecutable,
    ['src/styles/main.scss', generatedCandidate, '--style=expanded', '--no-source-map'],
    { cwd: projectRoot, encoding: 'utf8' },
  );

  if (buildResult.status !== 0) {
    process.stderr.write(buildResult.stderr || 'Sass 编译失败。\n');
    process.exitCode = buildResult.status || 1;
  } else {
    const trackedCss = readFileSync(join(projectRoot, 'css/main.css'));
    const rebuiltCss = readFileSync(generatedCandidate);

    if (!trackedCss.equals(rebuiltCss)) {
      process.stderr.write('css/main.css 与 Sass 源码不一致，请先运行 npm run styles:build。\n');
      process.exitCode = 1;
    } else {
      process.stdout.write('css/main.css 与 Sass 源码一致。\n');
    }
  }
} finally {
  rmSync(temporaryDirectory, { recursive: true, force: true });
}
