// 开发自检：生气脸页面结构断言（不启动浏览器，浏览器渲染/视觉验收由 QA 阶段执行）
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");

let passed = 0;
const failures = [];
const assert = (cond, label) => {
  if (cond) {
    passed += 1;
  } else {
    failures.push(label);
  }
};

// --- HTML 文档结构 ---
assert(/<!DOCTYPE html>/i.test(html), "missing DOCTYPE");
assert(/<html[^>]*lang="zh-CN"/i.test(html), "missing lang=\"zh-CN\"");
assert(/<meta[^>]*charset="utf-8"/i.test(html), "missing charset declaration");
assert(/<title>/.test(html), "missing <title>");

// --- 自包含：不加载任何外部资源（xmlns 命名空间声明除外） ---
const htmlWithoutNamespaces = html.replace(/xmlns="[^"]*"/g, "");
assert(!/<script[^>]*src=/i.test(html), "external script reference found");
assert(!/<link[^>]*rel=["']?stylesheet/i.test(html), "external stylesheet reference found");
assert(!/https?:\/\//i.test(htmlWithoutNamespaces), "external URL reference found");

// --- SVG 表情元素存在性（对应 AC-01 的四类元素） ---
assert(/<circle[^>]*class="face"/.test(html), "face circle missing");
assert(/<path[^>]*class="brow-left"/.test(html), "left brow missing");
assert(/<path[^>]*class="brow-right"/.test(html), "right brow missing");
assert(/<ellipse[^>]*class="eye-left"/.test(html), "left eye missing");
assert(/<ellipse[^>]*class="eye-right"/.test(html), "right eye missing");
assert(/<path[^>]*class="mouth"/.test(html), "mouth path missing");
assert((html.match(/class="frown-line"/g) || []).length === 2, "glabella frown lines missing");

// --- 嘴型几何：两端低于中间（下撇，∩ 形），且左右对称 ---
const mouthMatch = html.match(/class="mouth"[^>]*d="([^"]+)"/);
assert(mouthMatch !== null, "mouth d attribute missing");
if (mouthMatch) {
  const [x1, y1, cx, cy, x2, y2] = mouthMatch[1].match(/-?\d+(?:\.\d+)?/g).map(Number);
  assert(y1 > cy && y2 > cy, "mouth ends must sit lower than its crest (downturned mouth)");
  assert(Math.abs(y1 - y2) < 1, "mouth endpoints must be vertically symmetric");
  assert(x1 < cx && cx < x2, "mouth crest must lie between its endpoints");
}

// --- 眉毛几何：内端低于外端（向眉心方向下压），左右对称 ---
const browDefs = [
  { cls: "brow-left", innerEnd: 1 },
  { cls: "brow-right", innerEnd: 1 },
];
for (const { cls, innerEnd } of browDefs) {
  const m = html.match(new RegExp(`class="${cls}"[^>]*d="([^"]+)"`));
  assert(m !== null, `${cls} d attribute missing`);
  if (m) {
    const [ax, ay, bx, by] = m[1].match(/-?\d+(?:\.\d+)?/g).map(Number);
    const points = [
      [ax, ay],
      [bx, by],
    ];
    const [inner, outer] = innerEnd === 1 ? [points[1], points[0]] : [points[0], points[1]];
    assert(inner[1] > outer[1], `${cls} inner end must be lower than outer end (pressed toward glabella)`);
    assert(
      (cls === "brow-left" && inner[0] > outer[0]) || (cls === "brow-right" && inner[0] < outer[0]),
      `${cls} inner end must point toward the face center (glabella)`
    );
  }
}

// --- 眼睛位于眉毛下方 ---
for (const eyeCls of ["eye-left", "eye-right"]) {
  const eye = html.match(new RegExp(`class="${eyeCls}"[^>]*`))?.[0] ?? "";
  const eyeCy = Number(eye.match(/cy="(-?\d+(?:\.\d+)?)/)?.[1]);
  const eyeRy = Number(eye.match(/ry="(-?\d+(?:\.\d+)?)/)?.[1]);
  const browCls = eyeCls === "eye-left" ? "brow-left" : "brow-right";
  const browD = html.match(new RegExp(`class="${browCls}"[^>]*d="([^"]+)"`))?.[1] ?? "";
  const browYs = browD.match(/-?\d+(?:\.\d+)?/g).map(Number).filter((_, i) => i % 2 === 1);
  const browMaxY = Math.max(...browYs);
  assert(Number.isFinite(eyeCy) && Number.isFinite(eyeRy) && browMaxY > 0, `${eyeCls} geometry unreadable`);
  assert(eyeCy - eyeRy >= browMaxY - 12, `${eyeCls} must sit visibly below the brow`);
}

// --- SVG 基本闭合 ---
const svgOpen = (html.match(/<svg\b/g) || []).length;
const svgClose = (html.match(/<\/svg>/g) || []).length;
assert(svgOpen === 1 && svgClose === 1, "svg element must appear exactly once and be closed");

if (failures.length > 0) {
  console.error(`SELF-CHECK FAILED (${failures.length} failure(s)):`);
  for (const f of failures) {
    console.error(` - ${f}`);
  }
  process.exit(1);
}
console.log(`SELF-CHECK PASSED: ${passed} assertions OK`);
process.exit(0);
