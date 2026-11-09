import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';

// 只检查站内链接和资源（href / src），外链受网络波动影响，不放进 CI 的必过检查。
const siteDirectory = resolve(process.argv[2] || '_site');
// 只在真实标签内取属性，避免把文章中转义展示的示例代码（&lt;script src=...&gt;）误判为链接。
const tagPattern = /<[a-z][a-z0-9-]*\b[^>]*>/gi;
const attributePattern = /\s(?:href|src)\s*=\s*(?:"([^"]*)"|'([^']*)')/gi;
const ignoredPrefixes = ['#', 'mailto:', 'tel:', 'javascript:', 'data:', '//'];

if (!existsSync(siteDirectory)) {
  process.stderr.write(`找不到构建目录 ${siteDirectory}，请先运行 jekyll build。\n`);
  process.exit(1);
}

function collectHtmlFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) return collectHtmlFiles(fullPath);
    return entry.name.endsWith('.html') ? [fullPath] : [];
  });
}

function isIgnored(link) {
  if (!link || /^[a-z][a-z0-9+.-]*:/i.test(link)) return true;
  return ignoredPrefixes.some((prefix) => link.startsWith(prefix)) || link.includes('{{');
}

// 与 GitHub Pages 的解析规则保持一致：目录取 index.html，无扩展名时也尝试补 .html。
function targetExists(filePath) {
  if (existsSync(filePath) && statSync(filePath).isFile()) return true;
  if (existsSync(join(filePath, 'index.html'))) return true;
  return existsSync(`${filePath}.html`);
}

function resolveLink(htmlFile, link) {
  const pathPart = link.split('#')[0].split('?')[0];
  if (!pathPart) return null;

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(pathPart);
  } catch {
    decodedPath = pathPart;
  }

  return decodedPath.startsWith('/')
    ? join(siteDirectory, decodedPath)
    : resolve(dirname(htmlFile), decodedPath);
}

const failures = [];
const htmlFiles = collectHtmlFiles(siteDirectory);

for (const htmlFile of htmlFiles) {
  const html = readFileSync(htmlFile, 'utf8');
  const links = Array.from(html.matchAll(tagPattern), ([tag]) =>
    Array.from(tag.matchAll(attributePattern), (match) => (match[1] ?? match[2]).trim()),
  ).flat();

  for (const link of links) {
    if (isIgnored(link)) continue;

    const target = resolveLink(htmlFile, link);
    if (!target) continue;

    const escapesSite = relative(siteDirectory, target).split(sep)[0] === '..';
    if (escapesSite || !targetExists(target)) {
      failures.push(`${relative(siteDirectory, htmlFile)} → ${link}`);
    }
  }
}

if (failures.length > 0) {
  process.stderr.write(`发现 ${failures.length} 个站内死链：\n${failures.map((item) => `  ${item}`).join('\n')}\n`);
  process.exitCode = 1;
} else {
  process.stdout.write(`已检查 ${htmlFiles.length} 个页面，未发现站内死链。\n`);
}
